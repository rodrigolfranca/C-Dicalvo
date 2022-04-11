module.exports = {
    apps: [
        {
            script: 'node',
            args: 'app.js',
            cwd: './backend/',
            name: 'Backend',
            watch: true
        },{
            script: 'node',
            args: 'index.js',
            cwd: './frontend/',
            name: 'Frontend',
            watch: true
        }
    ]
}