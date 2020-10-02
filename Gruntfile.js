module.exports = function(grunt) {
    // 加载任务依赖
    grunt.loadNpmTasks('grunt-screeps');
    // 定义任务
    grunt.initConfig({
        // screeps 代码上传任务
        screeps: {
            options: {
                email: '3170101245@zju.edu.cn',
                password: '8376462867fzc',
                branch: 'test',
                ptr: false
            },
            dist: {
                src: ['./src/*.{js,wasm}'],
            }
        },
    });
}