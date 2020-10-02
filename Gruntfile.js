module.exports = function(grunt) {
    // 加载任务依赖
    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 定义任务
    grunt.initConfig({
        // screeps 代码上传任务
        screeps: {
            options: {
                email: '3170101245@zju.edu.cn',
                password: '8376462867fzc',
                branch: 'colony',
                ptr: false
            },
            dist: {
                src: ['/*.{js,wasm}'],
            }
        },
    });
}