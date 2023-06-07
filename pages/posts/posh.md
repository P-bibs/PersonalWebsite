---
title: Notes on POSH
excerpt: 'The following notes were taken while reading POSH for csci2952R: Systems Transforming Systems taught by Nikos Vasilakis at Brown University in Fall of 2022.'
coverImage: "/blog/posh/title.png"
date: 2022-10-19
author:
  name: Paul Biberstein
  picture: "/portrait.jpg"
ogImage:
  url: "/blog/posh/title.png"
released: true
---

*The following notes were taken while reading POSH for [csci2952R: Systems Transforming Systems](https://cs.brown.edu/courses/info/csci2952-r/) taught by Nikos Vasilakis at Brown University in Fall of 2022.*

# Abstract
> We present POSH, a framework that accelerates shell applications with I/O-heavy components, such as data analytics with command-line utilities. Remote storage such as networked filesystems can severely limit the performance of these applications: data makes a round trip over the network for relatively little computation at the client. Reducing the data movement by moving the code to the data can improve performance. POSH automatically optimizes unmodified I/O-intensive shell applications running over remote storage by offloading the I/O-intensive portions to proxy servers closer to the data. A proxy can run directly on a storage server, or on a machine closer to the storage layer than the client. POSH intercepts shell pipelines and uses metadata called annotations to decide where to run each command within the pipeline. We address three principal challenges that arise: an annotation language that allows POSH to understand which files a command will access, a scheduling algorithm that places commands to minimize data movement, and a system runtime to execute a distributed schedule but retain local semantics. We benchmark POSH on real shell pipelines such as image processing, network security analysis, log analysis, distributed system debugging, and git. We find that POSH provides speedups ranging from 1.6× to 15× compared to NFS, without requiring any modifications to the applications.


# 1. Introduction
* The shell is ubiquitous, but was designed in a time when the difference in access time between local store and networked storage was small. Now, SSDs are orders of magnitude faster than networked storage, but networked storage is still in wide use.
* some commands are simple computationally (tar, git status) but slow down orders of magnitude when running on networked storage because they require naively copying so many blocks
* POSH is the "Process Offload Shell", a system that takes unmodified shell scripts and determines which parts to run locally and which to run on near-data-compute to massively speed up shell scripts running on networked data.

Three challenges:
1. Understanding and maintaing shell script semantics (which files are accessed?)
2. Distributing execution and figuring out how to minimize data movement
3. Auto-parallelizaiton while ensuring output keeps sequential order

The solutions are
1. Annotations (most scripts only access files they take as arguments)
2. A greedy scheduling algorithm that reduces data movement (can't be globally optimal, since the amount of data a script produces often isn't known til runtime)
3. split parallel invocations but then stitch them back in the right order

# 2. Related Work

## Near-data-computing
E.g. SQL allows user defined functions that run close to data, other systems allow writing FPGA code to run on accelerators co-located with storage. POSH takes a different approach since the local/colocated split is determined automatically

## NFS optimizations and filesystems
NFS allows some near-data functions (like server-side copy and batching operations), but the API is not nearly expressive enough for most shell scripts

## Distributed Execution Engines
MapReduce and other big-data systems require using a specific API, whereas POSH just lets you use shells.

Other tools automatically parallelize compute-intensive tasks like compilation and video encoding, whereas POSH focuses on I/O-intensive tasks

## Code offloading and type systems
Some systems use programming language support to determine what functions to offload to the proxy. POSH uses annotations instead

## Command-line tools
Some command line tools exist to parallelize execution of a shell script on remote servers via SSH, but POSH does not require SSH and also automatically determines how to perform the parallelization.

# 3. System Overview

![figure 1](/blog/posh/fig1.png)

## Annotation interface
User must provide a separate file that has annotations for any function invocations that they want to be considered for offloading (these could be crowdsourced).

## Parser and scheduler
The parser creates a DAG for each *pipeline* (often a single line with many commands seperate by pipes).

Each node of the DAG gets an execution location assigned.

The user must provide a configuration file that says which mounted drives correspond to which proxy servers

## Execution engine
A POSH execution engine running locally and on each proxy server runs the commands and makes sure output is stitched together in the right order

# 4. Shell Annotations
## 4.1 Motivation for Shell Annotations
Annotations must communicate:
1. Which commands can be safely offloaded to proxy
servers.
2. If any commands in the pipeline filter their input.
3. If any commands can be split in a data-parallel way into
multiple processes.

Annotations are needed, because shell commands vary so much that this data cannot be determined automatically. Without this data, offloading is hard because input-output relations are unknown.

## 4.2 Annotation Interface
Annotations consist of argument-specific info and command-specific info. This allows POSH to (1) parse and (2) accelerate commands.


### 4.2.1 Argument-specific information
Various annotations exist, but the most important ones tell POSH whether a given argument is an in/out file or if we can parallelize across by splitting a given argument.

Annotation for `cat`:
```
cat:
  - PARAMS:
    - type:input_file,splittable,size:list
```

### 4.2.2 Command-specific Information
Extra commands for special behavior like the command having smaller output than input or implicitly relying on reading the current directory.

### 4.2.3 Annotation Conflicts
Command annotations can be overloaded for when use of a flag changes depending on what other flags are also present

## 4.3 Correctness and Coverage
No acceleration or correctness guarantees if annotations are incorrect

## Mitigations
Could use a sandbox, but right now nothing is done to mitigate

## Coverage
Some annotations are shipped with POSH.

POSH can't cover certain situations like commands that take their file arugments from a pipe since the filename arguments aren't known statically.

# 5. Posh's Parser and Scheduler

![figure 2](/blog/posh/fig2.png)

## 5.1 Posh's Program Representation
Uses DAG internally to represent program. This tracks the dependencies between programs (via pipes) and inputs/outputs (like stdin, stdout, stderr).

The DAG also has associated metadata for each command invocation based on annotations (so it knows how to parallelize).

## 5.2 Scheduling
Since amount of data output by a command is unknown ahead of time, use a greedy algorithm.

### Problem setup
The scheduler is a function that takes the pipeline DAG as input and produces an execution location for each DAG node (command) as output.

The algorithm solves an optimization problem to minimize bytes transferred across edges while respecting constraints on where certain nodes can execute.

### Step 1: resolving constraints on each node
* All commands that only need data from a single mount run on that mount's proxy
* All commands that access files from multiple mounts *must* run on the client (there is an optimization to remove this, see 5.3)

### Step 2: minimizing data transfer
All paths from source to sink are traced. If the source and sink are on separate devices, an edge must be picked for the data transfer to occur. Heuristics are used, with the assumption that every command either outputs as much as it gets as input, or outputs half as much as it gets as input.

Once an edge to perform the data transfer at is chosen, all nodes before and after that edge can have their locations assigned.

## 5.3 Parallelization

### Determining which nodes to parallelize
Annotations guide this process. We need to know what commands we can start a split at (like `cat`) and which commands we can continue a split through (like `grep`).

### Splitting across mounts

We can remove the requirement that all commands that access multiple mounts must be performed on the client if we are able to parallelize the command and push it to the mounts.

### Correctly preserving output order
Split command outputs must be stitched back together in the correct order.

# 6 Posh Configuration and Execution

## 6.1 Posh Configuration
Each datacenter must have a POSH server (this can serve multiple clients, including access-control).

Each client must run the POSH client and supply config to say which mounts correspond to which proxy servers.

## 6.2 Execution Engine

### Setup Phase
DAG is divided into subprograms that are distributed to servers and persistent connections from client to server are setup

### Execution Phase
Nodes with multiple jobs to do perform them in sequence

## 6.3 Implementation
In Rust 🦀

# 7. Methodology

## 7.1 Applications

### Ray-tracing log analysis
Ideal for POSH: not compute intensive and the data written out at the client is very small compared to the input

### Thumbnail generation
CPU-intensive, but still produces small output compared to input. Parallelizable.


### Port scan analysis
CPU-intensive, not parallel, large data transfers.

### Distributed log analysis
Synthetic workload. CPU-light, parallel, small output

### Git workflow
Very metadata heavy: applies 20 git patches to *Chromium* in a row and runs `git <status, add, commit>`

## 7.2 Setup and Baselines
Compare POSH to baseline NFS.

All benchmarks are performed in two configurations
1. Client and server in same GCP region (0.5ms, 5-10Gbps)
2. Client at Stanford and server in nearby GCP region (20ms, 600Mbps)

# 8. Evaluation

## 8.1 End-to-End Application Performance

### Summary of all results

### Ray-tracing log analysis
8x improvement in config 2, not improvement in config 1

### Thumbnail generation
1.7x improvement in config 2, not improvement in config 1

### Port scan analysis
1.6x improvement in config 2, not improvement in config 1

### Distributed log analysis
12.7x improvement in config 2, 2x speedup in config 1

### Git workflow
10-15x improvement in config 1, too long to measure in config 2

## 8.2 Posh Configuration

### 8.2.1 Proxy Placement
Running the proxy on a different server in the datacenter vs. the same server as the storage makes not much difference since intra-datacenter communication is fast.
e
### 8.2.2 Parallelization on a single machine
Simple study of how increasing core-usage decreases processing time, but only to a point.

## 8.3 Performance Improvements Analysis

### Data movement reductions
Amount of data that would have been transferred over the wire without POSH that isn't needed with POSH.

### Posh overheads
startup time due to parsing and scheduling (10s of milliseconds)

# 9. Limitations and Future work
## Algorithm Limitations
If we allow servers to move data between each other to perform operations over multiple server's data without having to go to the client, then the scheduling gets harder but the optimal solutions are better.

## Security
No security when accessing files on server. Could use a sandbox

## Resource Management
POSH makes no attempt to not saturate the compute power of the storage server, which could increase NFS latency time for other users while POSH is running.

## Failure Recovery
Since POSH emulate shell semantics by streaming data, failing mid-pipeline could leave files in intermediate states. Hypothetically graceful failures would be possible since POSH knows all input/output files and could use temp files instead.

# 10. Conclusion

Thanks for reading :)

# Reviewer Notes

## Summary
POSH attempts to provide speed improvements for users who run shell scripts on (multiple) remote data by mounting it via NFS. POSH makes the observation that copying this data to the local machine to process it is often wasteful, and attempts to do as much processing as possible on a proxy server near the storage medium to remove unecessary copies, all while not requiring users to modify their shell scripts.

To that end, POSH contributes the following
1. A light annotation system for shell commands to understand which of their arguments are input and output files and whether or not they can be parallelized
2. A scheduler and associated algorithm to determine which portions of a shell script to run on near-data-compute and which to run locally after copying remote data.
3. Client/server programs to run on the local machine and in a datacenter, respectively, that implement the above scheduling algorithm to automatically accelerate shell scripts over big data.

## Pros and Cons
### Pros:
* A robust implementation is provided with benchmarks on a variety of scenarios across two different configurations.

### Cons: 
* It seems that the degree of parallelization is limited (basically only applies to simply parallel commands like `cat`?). However, this is probably ok since the paper isn't focusing on parallelism for its speedups.
* They say they need to minimize bytes flowing across DAG edges, but isn't this only true if the two ends of that edge aren't in the same colocation? The description of the scheduling algorithm is slightly confusing on finer points like these and others
* The algorithm to determine where to execute a command is fairly basic. Could more advanced heuristics (like more precise metrics on how much commands filter their input) produce better results, or is do we get 80% of the results for 20% of the effort.

## Further questions
POSH presents the paradigm of a user working on a local machine while accessing data at a remote datacenter. The assumption is made that the local machine has power equivalent to a desktop PC, as do the machines the proxy runs on. Do the benchmarks still hold up if these assumptions don't hold? For example, if lts of computer power is available locally but not in the datacenter, it may be more worthwhile to simply copy all the data over.

As far as I can tell, if I was ever working in the paradigm POSH presents (having to mount remote data via NFS), it would always make more sense to SSH to a remote machine in the datacenter and then mount the colocated servers from there. As mentioned in the paper, intra-datacenter communication is so fast that POSH is unecessary. Is there ever a situation in which this solution doesn't work?
