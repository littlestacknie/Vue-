# 2022.1.11 学习记录

## 一、移动端常见布局

### 1.流式布局（百分比布局）

通过盒子的宽度设置成百分比来根据屏幕的宽度进行伸缩，不受固定像素限制，内容向两侧填充。（主要是宽度设置为百分比）

```
<style>
        * {
            margin: 0;
            padding: 0;
        }
        
        section {
            width: 100%;
            max-width: 980px;
            min-width: 320px;
            margin: 0 auto;
        }
        
        section div {
            float: left;
            width: 50%;
            height: 400px;
        }
        
        section div:nth-child(1) {
            background-color: pink;
        }
        
        section div:nth-child(2) {
            background-color: purple;
        }
    </style>
    
```

### 2.`Flex`弹性布局（兼容差   主要应用在移动端）

1）原理：通过给父盒子添加flex属性，来控制子盒子的位置和排列方式。任何一个容器都可以指定为`flex`布局，当我们为父盒子设为`flex`布局以后，子元素`float`,`clear`,`vertical-align`属性将失效

2）常见父项属性：

- `flex-direction`设置主轴的方向：`row`(从左到右)，`row-reverse`(从右到左)，`column`(从上到下)，`column-reverse`(从下到上)；
- `justify-content`设置主轴上的子元素排列方式：若主轴为x轴，`flex-start`（从左到右），`flex-end`(从右到左)，`center`(水平居中)，`space-around`(平分空间)，`space-between`(先两边贴边，再平分空间)；`space-evenly`(均匀分布，项目与边框和项目之间距离相等)；
- `flex-wrap`设置子元素是否换行：默认子元素是不会换行的，多出来的一起挤在父盒子。`nowrap`(不换行)，`wrap`（换行）；
- `align-content`设置侧轴上的子元素的排列方式（多行）：`stretch`(拉伸显示)，其他属性可参考`justify-content`;
- `align-items`设置侧轴上的子元素排列方式（单行）：`flex-start`,`flex-end`,`center`,`baseline`(各项目的第一行文字的基线对齐),stretch(默认，指项目若没有设置高度，则占满整个容器)
- `flex-flow`符合属性，相当于同时设置了`flex-direction`和`flex-wrap`:

3）常见子项属性，参考链接，写的很全：https://juejin.cn/post/7019075844664459278

### 3. `rem`适配布局

1. 首先区分`em`和`rem`:

`em`是相对于父元素的字体大小来说的，比如：

```javascript
div {
	font-size:12px;
}
div>p {
	width:10em;
	height:10em;
}
//这样说明p的宽和高都是120px
```

`rem`(`root em`)是相对于`html`元素的字体大小，比如：

```js
html {
	font-size:14px;
}
div {
	font-size:12px;
}
div>p {
	//width:10em;  此时宽高为120px
	//height:10em;
    width:10rem;
    height:10rem;//此时宽高为140px
}
```

rem的优点就是可以通过修改html里面的文字大小来改变页面中元素的大小，实现整体控制

2. 媒体查询

   媒体查询（Media Query)是CSS3新语法，可以针对不同的屏幕尺寸设置不同的样式

   ```javascript
   @media screen and (max-width:800px){
       body {
           background-color:pink;
       }
   }//翻译：在我们的屏幕上 并且 宽度小于等于800px 则把body背景色设为粉色
   ```

   ![](C:\Users\HP\AppData\Roaming\Typora\typora-user-images\image-20220301202931960.png)

![](C:\Users\HP\AppData\Roaming\Typora\typora-user-images\image-20220301210328437.png)



