module.exports = function (grunt) {
    // 加载任务依赖
    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks("grunt-contrib-watch")
    // 定义任务
    grunt.initConfig({
        // screeps 代码上传任务
        screeps: {
            options: {
                email: '3170101245@zju.edu.cn',
                password: '8376462867fzc',
                branch: 'evolution',
                ptr: false
            },
            dist: {
                src: ['./src/*.{js,wasm}'],
            }
        },
        watch: {
            files: "./src/*.*",
            tasks: ["screeps"]
        }
    });
}