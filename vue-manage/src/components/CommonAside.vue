<template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <h3 class="title">{{isCollapse ? '后台':'通用后台管理系统'}}</h3>
      <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
          <i :class="'el-icon-'+item.icon"></i>
          <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu v-for="item in hasChildren" :index="item.label" :key="item.path">
      
        <template slot="title">
          <i :class="'el-icon-'+item.icon"></i>
          <span>{{item.label}}</span>
        </template>
          <el-menu-item @click="clickMenu(children)" v-for="children in item.children" :index="children.path" :key="children.path">{{children. label}}</el-menu-item>
          
      </el-submenu>
    </el-menu>
  
</template>

<script>

export default {
    name:'CommonAside',
    data() {
      return {
      //   menu:[
      //     {
      //       path: '/home',
      //       name: 'home',
      //       label: '首页',
      //       icon: 's-home',
      //       url: 'Home/Home'
      //     },
      //     {
      //       path: '/mall',
      //       name: 'mall',
      //       label: '商品管理',
      //       icon: 'video-play',
      //       url: 'MallManage/MallManage'
      //     },
      //     {
      //       path: '/user',
      //       name: 'user',
      //       label: '用户管理',
      //       icon: 'user',
      //       url: 'UserManage/UserManage'
      //     },
      //     {
      //       path: '/other',
      //       label: '其他',
      //       icon: 'location',
      //       children: [
      //         {
      //           path: '/page1',
      //           name: 'page1',
      //           label: '页面1',
      //           icon: 'setting',
      //           url: 'Other/PageOne'
      //         },
      //         {
      //           path: '/page2',
      //           name: 'page2',
      //           label: '页面2',
      //           icon: 'setting',
      //           url: 'Other/PageTwo'
      //         }
      //       ]
      //     }
      // ]
      }
    },
    methods: {
      clickMenu(item){
        this.$router.push(item.name)
        this.$store.commit('selectMenu',item)
      }
    },
    computed:{
      noChildren(){
        return this.asyncMenu.filter(item=>!item.children)
      },
      hasChildren(){
        return this.asyncMenu.filter(item=>item.children)
      },
      isCollapse(){
        return this.$store.state.tab.isCollapse
      },
      asyncMenu(){
        return this.$store.state.tab.menu
      }
    }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.el-menu{
  height: 100%;
  border: none;
  h3 {
    text-align: center;
    color: #fff;
    line-height: 48px;
  }
}
</style>

