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



