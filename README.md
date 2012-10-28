# NMake

NMake is an asynchronous, event-drive build tools.

## Goals

NMake's primary goal is to make an excellent tool for small jobs,
like building npm modules in a particular order.
Only after creating a successful tool for small jobs will NMake
attempt to tackle large scale jobs.

Secondly, each NMake file should be a Node.js module.

## Usage

Run `nmake` from any directory containing an `NMakefile`:

	$ nmake
	[INFO] Making init
	       | Make Init
	[INFO] Making release
	       | Make Release
	[INFO] Making default
	       | Making Default!
	[SUCCESS] DONE

## NMakefile

An NMakefile compiles is written in coffee script, but briefer.
The NMake library inserts all the ugly boilerplate.
The _hello world_ of NMakefile is:

	hello:
		info 'Hello'
		next()

	world: hello
		info 'World'
		next()

Since NMake is evented, at the very least you _must_ call `next()` on success,
and `next(err)` when there is an error. 
Any error halts the make process.

