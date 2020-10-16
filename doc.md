# 进化式screeps控制器文档

## 一、文件结构
    说明：文件前缀从a到z代表其层次结构
* main：主循环
    * initialize：初始化，在代码每次提交后运行一次
        * initCreep：定义了各种Creep的方法
        * initTerrain：定义各种地形的方法
        * initStructure：定义各种建筑的方法
    * runner：Creep的逻辑控制
        * workerRunner：worker的逻辑控制
    * manager：房间建筑学规划
----------------------------------
## 二、各种数据结构规范
>注：#xxx代表一个数值，'xxx'代表一串字符串变量，"xxx"代表一串字符串常量，
>{}代表节点值的取值范围
### 1、Memory树：
* root
    * creeps
        * workers
            * workerID
                * work: {"harvest","upgrade","haul","build"}
                * target: 'targetID'
                * rolePosibility
                    * harvest: #pHarvest
                    * upgrade: #pUpgrade
                    * haul: #pHaul
                    * build: #pBulid
                * evolutionInfo
                    * bodypartScore
                        * WORK: #sWORK
                        * CARRY: #sCARRY
                        * MOVE: #sMOVE
                    * roleScore
                        * harvest: #sHarvest
                        * upgrade: #sUpgrade
                        * haul: #sHaul
                        * build: #sBulid
                * ...
        * combatants
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
