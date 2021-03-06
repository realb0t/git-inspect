#!/bin/bash
git init
echo "1" >> test0.txt
git add .
git commit -am '1'
git checkout -b merged-branch-1
echo "1" >> test1.txt
git add .
git commit -am '2'
echo "2" >> test1.txt
git commit -am '3'
git checkout master
echo "2" >> test0.txt
git commit -am '4'
git checkout -b merged-branch-2
echo "1" >> test2.txt
git commit -am '5'
echo "2" >> test2.txt
git commit -am '6'
git checkout master
git merge merged-branch-2 --no-ff
git checkout merged-branch-1
git rebase master
git checkout master
git merge merged-branch-1
