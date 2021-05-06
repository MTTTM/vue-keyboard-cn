<template>
  <div class="operation-wrap">
    <div class="operation-wrap-left">
      <div class="operation-wrap-left-pancel">
        <!-- 上下 -->
        <span
          class="operation-btn operation-btn-top icon iconfont icon-arrow-up-filling"
        ></span>
        <span
          class="operation-btn operation-btn-btm icon iconfont icon-arrow-down-filling"
        ></span>
        <!-- 左右 -->
        <span
          class="operation-btn operation-btn-left icon iconfont icon-arrow-left-filling"
        ></span>
        <span
          class="operation-btn operation-btn-right icon iconfont icon-arrow-right-filling"
        ></span>
      </div>
    </div>
    <div class="operation-wrap-right">
      <div class="operation-wrap-right-inner">
        <div class="operation-wrap-right-item">全选</div>
        <div class="operation-wrap-right-item">复制</div>
        <div class="operation-wrap-right-item">粘贴</div>
      </div>
      <div class="operation-wrap-right-inner">
        <div class="operation-wrap-right-item icon iconfont icon-delete"></div>
        <div class="operation-wrap-right-item icon iconfont icon-enter"></div>
        <div class="operation-wrap-right-item">剪切板</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.operation-wrap {
  height: 230px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  .operation-wrap-left {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .operation-wrap-right {
    flex: 1;
    display: flex;
    .operation-wrap-right-inner {
      width: 50%;
    }
    .operation-wrap-right-item {
      width: 60px;
      height: 40px;
      background: rgba(255, 255, 255, 0.7);
      color: #333;
      border-radius: 4px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      & + .operation-wrap-right-item {
        margin-top: 10px;
      }
      &.iconfont {
        font-size: 25px;
      }
      &:active {
        color: #000;
        background: rgba(255, 255, 255, 1);
      }
    }
  }
  .operation-wrap-left-pancel {
    position: relative;
    width: 130px;
    height: 130px;
    border-radius: 100%;
    border: 1px solid #999;
  }
  .operation-btn {
    position: absolute;
    width: 40px;
    height: 40px;
    color: #666;
    font-size: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    &:active {
      color: #000;
    }
  }
  .operation-btn-top {
    left: 50%;
    transform: translateX(-50%);
    top: 5px;
  }
  .operation-btn-btm {
    left: 50%;
    transform: translateX(-50%);
    bottom: 5px;
  }
  .operation-btn-left {
    top: 50%;
    transform: translateY(-50%);
    left: 5px;
  }
  .operation-btn-right {
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
  }
}
</style>