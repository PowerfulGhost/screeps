# 进化式screeps控制器文档

## 一、文件结构
    注：文件前缀从a到z代表其层次结构
* main：主循环
    * initialize：初始化，在代码每次提交后运行一次
        * initCreep：定义了各种Creep的方法
        * initTerrain：定义各种地形的方法
        * initStructure：定义各种建筑的方法
    * runner：Creep的逻辑控制
        * workerRunner：worker的逻辑控制
    * manager：房间建筑学规划
----------------------------------
## 二、整体思路
    1、每个creep每300tick进行一次随机的状态转换，以决定下300个tick自己的工作
    2、每个creep在积攒了一定的分数后，可以要求当前房间的spawn生成自己的后代。自己后代的工作偏好概率和身体部件由当前creep的分数组成决定，遵循用进废退原则
    3、根据工作效果给creep的每种工作进行打分，例如采集能量的数量决定了creep的采集分，搬运资源的数量决定了creep的搬运分
        遵循[WORK,CARRY,MOVE]配置的creep在采集、搬运、升级、建造四种工作中获得的分数相等的原则（300分）
        具体打分规则为：
            采集分=采集能量的数量 = 2*WORK数量*采集时长
            搬运分=(3/25)*搬运的资源量*搬运对应资源量的时长
            升级分=2*升级消耗的能量 = 2*WORK数量*升级时长
            建造分=(2/5)*建造消耗的能量 = 2*WORK数量*建造时长
    4、根据身体部件的使用频率给身体部件打分，例如需要WORK的动作增加WORK分，需要MOVE的动作增加MOVE分
----------------------------------
## 三、各种数据结构规范
    注：#xxx代表一个数值，'xxx'代表一串字符串变量，"xxx"代表一串字符串常量，{}代表节点值的取值范围
### 1、Memory树：
* root
    * creeps
        * name
            * id: 'creepID'
            * role: {"worker","combatant"}
            * work: {"harvest","upgrade","haul","build"}    (for workers)
            * target: 'targetID'
            * rolePosibility    (for workers)
                * harvest: #pHarvest
                * upgrade: #pUpgrade
                * haul: #pHaul
                * build: #pBulid
            * evolutionInfo     (for workers)
                * bodypartScore
                    * work: #sWork
                    * carry: #sCarry
                    * move: #sMove
                * roleScore     (for workers)
                    * harvest: #sHarvest
                    * upgrade: #sUpgrade
                    * haul: #sHaul
                    * build: #sBulid
            * ...
    * rooms
        * roomName
            * structures
                * spawns
                * ...
            * terrain
                * sources
                * ...
    * flags
        * ...
