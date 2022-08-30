new Vue({
    el: '#app',
    data: {
        result:'0',
        uniqueKey: 0,
        items:[
            ['7','8','9','/'],
            ['4','5','6','*'],
            ['1','2','3','-'],
            ['0','.','+','='],
        ],
        results:JSON.parse(localStorage.getItem('results')) || []
    },
    mounted(){
        this.getUniqueKey()
    },
    methods: {
        getUniqueKey: function () {
            if(this.results.length === 0) {
              return
            }
          
            let maxUniqueKey = 0
            this.results.forEach(function(resulted) {
              if (maxUniqueKey < resulted.id) {
                maxUniqueKey = resulted.id
              }
            });
      
            this.uniqueKey = maxUniqueKey
          },
        calculate:function(cmd){
            if(cmd == '='){
                this.result = eval(this.result);
                this.addResulted();
            }else if(cmd == 'c'){
                this.result = '0';
            }else if(this.result == '0'){
                this.result = cmd;
            }else{
                this.result += cmd;
            }
            this.audio();
        },
        audio:function() {
            document.getElementById('btn_audio').currentTime = 0; //連続クリック
            document.getElementById('btn_audio').play(); //クリックしたら音を再生
        },
        mute:function(){
            if (document.getElementById('btn_audio').muted) {
                document.getElementById('btn_audio').muted = false;
            } else {
                document.getElementById('btn_audio').muted = true;
            }
        },
        addResulted:function(){
            this.results.push(
                {
                    newResult:this.result,
                    id: ++this.uniqueKey
                }
            );
        },
        use:function(resulted){
            this.result += resulted.newResult ;
            this.audio();
        }
    },
})