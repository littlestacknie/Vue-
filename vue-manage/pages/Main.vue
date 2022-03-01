<template>
  <el-container>
    <el-aside width="auto"><common-aside/></el-aside>
    <el-container>
      <el-header><common-header/></el-header>
      <el-main>
        <common-tag/>
        <common-main/></el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '../src/components/CommonAside'
import CommonHeader from '../src/components/CommonHeader'
import CommonMain from '../src/components/CommonMain'
import CommonTag from '../src/components/CommonTag'
export default {
  name: 'Main',
  components: {CommonAside,CommonHeader,CommonMain,CommonTag},
}
</script>

<style>
  html,body {
    margin: 0;
    padding: 0;
  }
  #app{
    height: 100vh;
  }
  .el-container{
    height: 100%;
  }
  .el-header{
    background-color: #000;

  }
  .el-main {
    padding-top: 0;
    
  }
  
</style>