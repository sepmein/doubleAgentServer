//重构api

/*
* 1. 创立一个并行，可扩展的结构，并将其封装至一个master下
*   master
*       properties:
*           a. tickTock int
*           b. task obj Task
*           c. concurrency int
*           d. prerequisite
*       functions:
*           a. 增加减少concurrency
*           b. 根据concurrency调整tickTock
*           c. 调整task队列
*           d. prepare
*           e. todo http rest api for master control
*
*   task
*       properties:
*           a. fn fn
*           b. params
*           c. judgement
*       functions:
*           a. addFn
*           b. judge
*               return 0 or 1 as result
*
* */

create task with fn

setup env

create master with task
