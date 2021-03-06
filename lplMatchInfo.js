// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: comments;
// 
// iOS 桌面组件脚本 @「小件件」
// 开发说明：请从 Widget 类开始编写，注释请勿修改
// https://x.im3x.cn
// 

// 添加require，是为了vscode中可以正确引入包，以获得自动补全等功能
// @ts-ignore
if (typeof require === 'undefined') require = importModule
const { Base } = require("./「小件件」开发环境")

// @组件代码开始
class Widget extends Base {
  /**
   * 传递给组件的参数，可以是桌面 Parameter 数据，也可以是外部如 URLScheme 等传递的数据
   * @param {string} arg 自定义参数
   */
  constructor (arg) {
    super(arg)
    this.name = '示例小组件'
    this.desc = '「小件件」—— 原创精美实用小组件'
  }

  /**
   * 渲染函数，函数名固定
   * 可以根据 this.widgetFamily 来判断小组件尺寸，以返回不同大小的内容
   */
  async render () {
    const data = await this.getData(0)
    switch (this.widgetFamily) {
      case 'large':
        return await this.renderLarge(data)
      case 'medium':
        return await this.renderMedium(data)
      default:
        return await this.renderSmall(data)
    }
  }

  /**
   * 渲染小尺寸组件
   */
  async renderSmall (data) {
    let w = new ListWidget()  
    
    let time = data['weekday']+':'+data['time'].slice(5)
    await this.renderHeader(w,'https://search-operate.cdn.bcebos.com/d58b21cd46c5d0595298131fe8162d87.png', time)
    let lplData =data['list']
    for(let i=0;i<lplData.length;i++){
      let lplDate=lplData[i].startTime
      let lplScore = lplData[i].leftLogo.score+":"+lplData[i].rightLogo.score
      let t =w.addText(lplDate.slice(11,16))
      t.textOpacity=0.68
      // w.addSpacer(2)
      let body =w.addStack()
      let imgLeft = body.addImage( await this.getImage(lplData[i].leftLogo.logo)) 
      body.addSpacer(1)
      let leftName = lplData[i].leftLogo.name
      let rightName =lplData[i].rightLogo.name
      
      let tLeft=body.addText(leftName.padStart(3,'   '))
      body.addSpacer(2)
      let tScore = body.addText(lplScore)
      body.addSpacer(2)
      let tRight=body.addText(rightName.padEnd(3,'   '))
      body.addSpacer(1)
      let imgRight = body.addImage( await this.getImage(lplData[i].rightLogo.logo)) 
      w.addSpacer(2)
      body.centerAlignContent()
      if(lplData.length>2){
        t.font = Font.boldSystemFont(12)
        tLeft.font=tRight.font = Font.lightSystemFont(16)
        tScore.font = Font.lightSystemFont(14)     
      }else{
       t.font = Font.boldSystemFont(14)
      tScore.font = Font.lightSystemFont(14)
      }
      tScore.textColor = new Color('#ff0000',1) 
      imgLeft.imageSize=new Size(16,16)
      imgRight.imageSize=new Size(16,16)
    }
   
    w.addSpacer()
   
    return w
  }
  /**
   * 渲染中尺寸组件
   */
   async renderMedium (data) {
    let w = new ListWidget()
    // 判断今天是否有比赛
    let date =new Date()
    let time = data['weekday']+':'+data['time']
    let date1 = data['time'].slice(8)
    let date2 = date.getDate()
    console.log(date1,date2)
    if(date1!=date2){
       time ="(今日无比赛）"+time
    }
    await this.renderHeader(w,'https://search-operate.cdn.bcebos.com/d58b21cd46c5d0595298131fe8162d87.png', time)
    let lplData =data['list']
    // 判断多余三场的比赛将舍去后面的
    if(lplData.length>3){
      lplData=lplData.slice(0,3)
    }
    for(let i=0;i<lplData.length;i++){     
      let lplDate=lplData[i].startTime
      let lplScore = lplData[i].leftLogo.score+"  :  "+lplData[i].rightLogo.score
      let t =w.addText(lplDate.slice(11,16))
      t.textOpacity=0.68
      let body =w.addStack()
    
      let imgLeft = body.addImage( await this.getImage(lplData[i].leftLogo.logo))   
      body.addSpacer(2)
     
      let leftName = lplData[i].leftLogo.name
      // 队名是两个字母的后面补上空格
      
      let tLeft = body.addText(leftName.padStart(3,'   '))

      body.addSpacer(12)
      let tScore = body.addText(lplScore)
      if(lplData[i].leftLogo.score!= '-'){
        tScore.textColor= new Color('#ff0000',1)
      }
      body.addSpacer(12)

      let rightName =lplData[i].rightLogo.name
       // 队名是两个字母的后面补上空格
      let tRight =body.addText(rightName.padEnd(3,'   ')) 
      body.addSpacer(2)
      let imgRight = body.addImage(await this.getImage(lplData[i].rightLogo.logo))     
      body.addSpacer(20)
      let t4 = body.addText("<"+lplData[i].statusText+">")  
      if(lplData[i].statusText=='进行中'){
        t4.textColor =new Color('#ff0000',1)
      } 
      
      t4.font = Font.lightSystemFont(14)
      t.leftAlignText()
      body.centerAlignContent()
    //  body.url = this.actionUrl('Url','https://tiyu.baidu.com/match/LPL/tab/%E6%8E%92%E5%90%8D')
      //判断比赛场数，做不同的布局显示
      let imgSize 
      if(lplData.length>2){
        imgSize =20
        t.font = Font.boldSystemFont(14)
        tLeft.font = Font.lightSystemFont(18)
        tScore.font = Font.lightSystemFont(16)
        
        tRight.font = Font.lightSystemFont(18)    
      }else{
        imgSize =24
        t.font = Font.lightSystemFont(16)
        tLeft.font = Font.lightSystemFont(20)
        tScore.font = Font.lightSystemFont(16)
      
        tRight.font = Font.lightSystemFont(20)
      }
      imgLeft.imageSize=new Size( imgSize, imgSize)
      imgRight.imageSize=new Size( imgSize, imgSize)
    }  
    
    w.addSpacer()  
    let url='https://tiyu.baidu.com/match/LPL/tab'
    w.url = this.actionUrl('open-url', decodeURIComponent(url))
    
   
    return w
   }
   //获取战队图片logo
   async getImage (url) {
    let req = new Request(url)
    console.log(req)
    // @ts-ignore
    return await req.loadImage()
  }
  /**
   * 渲染大尺寸组件
   */
  async renderLarge (data) {
   
    return await this.renderMedium(data)
  }

  /**
   * 获取数据函数，函数名可不固定
   */
  async getData (d) {
    let date = new Date()
    let time = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate()-1+d)
    const api = `https://tiyu.baidu.com/api/match/lpl/live/date/${time}/direction/after`
   let req= new Request(api)
   // @ts-ignore
   req.method = "GET"
   // @ts-ignore
   req.headers = {
     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36 Edg/87.0.664.55"
   }
   // @ts-ignore
   let response =await req.loadJSON()
 
   if(response['message']=='成功') return response['data'][0]
   
  }

  /**
   * 自定义注册点击事件，用 actionUrl 生成一个触发链接，点击后会执行下方对应的 action
   * @param {string} url 打开的链接
   */
  async actionOpenUrl (url) {
    Safari.open(url)
  }

}
// @组件代码结束

const { Testing } = require("./「小件件」开发环境")
// @ts-ignore
await Testing(Widget)