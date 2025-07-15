<template>
    <div>
        <div class="main_box">
            <div class="sc-bdOgaJ ScJti h100 flex justify-content-center hidden w100">
                <div class="bg_flf absolute z2 bg_img"><img src="https://csgo-oss.k1cs.com/web/home/h_fuli.png">
                    <div class="divText absolute flex flex-column flex-xy-center z5">
                        <router-link v-if="isPc" to="/p/roll" class="router_link">
                            <span >roll房</span>
                        </router-link>
                        <router-link v-else to="/m/roll" class="router_link">
                            <span >roll房</span>
                        </router-link>
                    </div>
                </div>
                <div class="bg_jsc absolute z2 bg_img"><img src="https://csgo-oss.k1cs.com/web/home/h_jinsheng.png"><img
                        src="https://csgo-oss.k1cs.com/web/home/h_jinsheng.webp" class="webp"><img
                        src="https://csgo-oss.k1cs.com/web/home/h-qiang.png" class="qiang">
                    <div class="divText absolute flex flex-column flex-xy-center z5">
                        <router-link  v-if="isPc" to="/p/mall" class="router_link">
                            <span >商城</span>
                        </router-link>
                        <router-link v-else to="/m/mall" class="router_link">
                            <span >商城</span>
                        </router-link>
                    </div>
                </div>
                <div class="bg_lyt absolute z2 bg_img"><img src="https://csgo-oss.k1cs.com/web/home/h_lanyue2.png"><img
                        src="https://csgo-oss.k1cs.com/web/home/h_lanyue.webp" class="webp">
                    <div class="divText absolute flex flex-column flex-xy-center z5">
                        <router-link  v-if="isPc" to="/p/battle/list" class="router_link">
                            <span >对战房</span>
                        </router-link>
                        <router-link v-else to="/m/battle/list" class="router_link">
                            <span >对战房</span>
                        </router-link>
                    </div>
                </div>
                <div class="bg_tc absolute z2 bg_img"><img src="https://csgo-oss.k1cs.com/web/home/h_tianci.png"><img
                        src="https://csgo-oss.k1cs.com/web/home/h_tianci.webp" class="webp">
                    <!-- <div class="divText1 absolute flex flex-column flex-xy-center z5">
                        <router-link to="/index" class="router_link">
                            <span >BOX开箱</span>
                        </router-link>
                    </div> -->
                    <!-- <div class="divText absolute flex flex-column flex-xy-center z5">
                        <router-link v-if="isPc" to="/p/replacement" class="router_link">
                            <span >置换合约</span>
                        </router-link>
                        <router-link v-else to="/m/replacement" class="router_link">
                            <span >置换合约</span>
                        </router-link>
                    </div> -->
                </div>
                <div class="bg_jxk absolute z2 bg_img"><img src="https://csgo-oss.k1cs.com/web/home/h_junxu.png">
                    <div class="divText absolute flex flex-column flex-xy-center z5">
                        <router-link v-if="isPc" to="/p/home" class="router_link">
                            <span>BOX开箱</span>
                        </router-link>
                        <router-link v-else to="/m/home" class="router_link">
                            <span>BOX开箱</span>
                        </router-link>
                    </div>
                </div>
                <div class="sc-empnci iTWzxG w100 absolute z1">
                    <div class="sc-fThUAz izxyxi cloudType1"></div>
                    <div class="sc-fThUAz dSFQwi cloudType1"></div>
                    <div class="sc-fThUAz eFPxte cloudType1"></div>
                    <div class="sc-fThUAz eGLsFz cloudType0"></div>
                    <div class="sc-fThUAz cLEQln cloudType0"></div>
                    <div class="sc-fThUAz kHPMba cloudType0"></div>
                    <div class="sc-fThUAz tmLzY cloudType1"></div>
                    <div class="sc-fThUAz fUHsRI cloudType1"></div>
                    <div class="sc-fThUAz hhVcwM cloudType1"></div>
                    <div class="sc-fThUAz dpySuy cloudType1"></div>
                    <div class="sc-fThUAz bKsuMf cloudType0"></div>
                    <div class="sc-fThUAz reabz cloudType0"></div>
                    <div class="sc-fThUAz djVkfW cloudType1"></div>
                    <div class="sc-fThUAz ctjRJG cloudType1"></div>
                    <div class="sc-fThUAz LKYUz cloudType0"></div>
                    <div class="sc-fThUAz bfiqKR cloudType0"></div>
                    <div class="sc-fThUAz llpzJp cloudType0"></div>
                    <div class="sc-fThUAz epqitP cloudType0"></div>
                    <div class="sc-fThUAz KPxBh cloudType1"></div>
                    <div class="sc-fThUAz jmBZnP cloudType1"></div>
                    <div class="sc-fThUAz cVWYOO cloudType0"></div>
                    <div class="sc-fThUAz bqOElN cloudType0"></div>
                    <div class="sc-fThUAz cXJUtM cloudType1"></div>
                    <div class="sc-fThUAz eUrtHe cloudType1"></div>
                    <div class="sc-fThUAz eMFlLX cloudType1"></div>
                    <div class="sc-fThUAz bDrrJW cloudType1"></div>
                    <div class="sc-fThUAz gcYclY cloudType0"></div>
                    <div class="sc-fThUAz hwMmXx cloudType0"></div>
                    <div class="sc-fThUAz joJPPj cloudType0"></div>
                    <div class="sc-fThUAz fqIbEy cloudType1"></div>
                    <div class="sc-fThUAz hTNimQ cloudType0"></div>
                    <div class="sc-fThUAz dsLnYB cloudType0"></div>
                    <div class="sc-fThUAz gJLokv cloudType1"></div>
                    <div class="sc-fThUAz cVRNWj cloudType0"></div>
                    <div class="sc-fThUAz logMzC cloudType1"></div>
                    <div class="sc-fThUAz fHcLbT cloudType0"></div>
                    <div class="sc-fThUAz eYNtcz cloudType1"></div>
                    <div class="sc-fThUAz jQtgqM cloudType1"></div>
                    <div class="sc-fThUAz iKTlqN cloudType0"></div>
                    <div class="sc-fThUAz jHVeBC cloudType1"></div>
                    <div class="sc-fThUAz dmMNY cloudType1"></div>
                    <div class="sc-fThUAz cPnLMK cloudType1"></div>
                    <div class="sc-fThUAz hKjhmA cloudType0"></div>
                    <div class="sc-fThUAz jhEjTL cloudType1"></div>
                    <div class="sc-fThUAz hSlTsd cloudType1"></div>
                    <div class="sc-fThUAz cxjblt cloudType1"></div>
                    <div class="sc-fThUAz fpkeGF cloudType0"></div>
                    <div class="sc-fThUAz xNqKw cloudType0"></div>
                    <div class="sc-fThUAz gFPtRl cloudType0"></div>
                    <div class="sc-fThUAz gyUIEq cloudType0"></div>
                    <div class="sc-fThUAz hhaa-du cloudType0"></div>
                    <div class="sc-fThUAz cROIAL cloudType0"></div>
                    <div class="sc-fThUAz gocQUN cloudType1"></div>
                    <div class="sc-fThUAz hJJNKU cloudType0"></div>
                    <div class="sc-fThUAz bGjZbu cloudType0"></div>
                    <div class="sc-fThUAz giSPMh cloudType1"></div>
                    <div class="sc-fThUAz KDvhD cloudType1"></div>
                    <div class="sc-fThUAz fOObQA cloudType1"></div>
                    <div class="sc-fThUAz clIYls cloudType1"></div>
                    <div class="sc-fThUAz QRPyP cloudType1"></div>
                    <div class="sc-fThUAz SqrCw cloudType1"></div>
                    <div class="sc-fThUAz kaoMUx cloudType1"></div>
                    <div class="sc-fThUAz buTDdo cloudType1"></div>
                    <div class="sc-fThUAz gsHASE cloudType0"></div>
                    <div class="sc-fThUAz bBVJRg cloudType0"></div>
                    <div class="sc-fThUAz cvqWOl cloudType1"></div>
                    <div class="sc-fThUAz cDvnWe cloudType1"></div>
                    <div class="sc-fThUAz iJxMPI cloudType1"></div>
                    <div class="sc-fThUAz dUCpCn cloudType0"></div>
                    <div class="sc-fThUAz ljBTtu cloudType1"></div>
                </div>
                <div class="sc-empnci iTWzxG w100 absolute z3">
                    <div class="sc-fThUAz MCPFV cloudType1"></div>
                    <div class="sc-fThUAz jNCwSZ cloudType1"></div>
                    <div class="sc-fThUAz lBAvP cloudType1"></div>
                    <div class="sc-fThUAz bfYKjx cloudType0"></div>
                    <div class="sc-fThUAz pKABp cloudType0"></div>
                    <div class="sc-fThUAz cmpyKC cloudType1"></div>
                    <div class="sc-fThUAz byVBmc cloudType1"></div>
                    <div class="sc-fThUAz gkTYpw cloudType1"></div>
                    <div class="sc-fThUAz fVFbPs cloudType0"></div>
                    <div class="sc-fThUAz kILkQZ cloudType1"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { isPCFunc, } from '@/util/common'
import { ref } from 'vue';
const isPc = ref(isPCFunc())
console.log(isPc.value,'isPc---------W------')
</script>
<style lang="scss">
html,body{
  font-size: 14px;
}

@keyframes qiang {
  0% {
    transform: translate(-50%,8%);
  }
  50%{
    transform: translate(-50%,32%);
  }
  100% {
    transform: translate(-50%,8%);

  }
}
 
.main_box {
    width: 100%;
    height: calc(80vh - 30px);
    background: url(@/assets/pcimg/activity/h_bg.png);
    position: relative;
}
.ScJti {
    --z80px:50px;
    --z1px:.8px;
    --z32px:12px;
    background: url(@/assets/pcimg/activity/h_bg.png) center center / cover no-repeat;
    .bg_img {
        .divText {
            line-height: 1px;
            -webkit-box-pack: center;
            justify-content: center;
             span {
                margin-top: -20px;
            }
            
        }
        img {
            width: 100%;
            position: relative;
            float: left;
            &.webp {
                position: absolute;
            }
        }
    }
    .bg_flf {
        left: 15%;
        top: 7%;
        width: 29%;
        max-width: 520px;
         .divText {
            right: 4%;
            bottom: 15%;
        }
    }
    .bg_jxk {
        left: -1px;
        bottom: -3%;
        width: 39%;
        max-width: 700px;
        .divText {
            left: 46%;
            top: 17%;
        }
    }
    .bg_lyt {
        left: 24%;
        bottom: 4%;
        width: 37%;
        max-width: 700px;
        .divText {
            left: 45%;
            top: 17%;
        }
         .webp {
            right: 5%;
            top: -45%;
            width: 35%;
        }
    }
    .bg_tc {
        right: -1px;
        top: -1px;
        width: 42%;
        max-width: 750px;
        .divText {
            right: 23%;
            bottom: 0px;
        }
        .divText1 {
            bottom: 22%;
            left: 22%;
        }
    }
    .bg_jsc {
        left: 54%;
        bottom: 0%;
        width: 37%;
        max-width: 760px;
        z-index: 3;
        .webp {
            left: 45%;
            top: -18%;
            width: 17%;
        }
        .qiang {
            position: absolute;
            left: 50%;
            top: 38%;
            width: 25%;
            transform: translateX(-55%);
            animation: 1.5s linear 0s infinite normal none running qiang;
        }
    }
    .divText {
        width: var(--z80px);
        height: calc(236 * var(--z1px));
        background: url('@/assets/pcimg/activity/textbg1.png') center center / contain no-repeat;
        span {
            font-size: var(--z32px);
            color: rgb(250, 255, 212);
            font-family: Honglei;
            -webkit-writing-mode: vertical-lr;
            writing-mode: vertical-lr;
            letter-spacing: calc(2 * var(--z1px));
        }
    }
    .divText1 {
        width: var(--z80px);
        height: calc(236 * var(--z1px));
        background: url('@/assets/pcimg/activity/textbg2.webp') center center / contain no-repeat;
        span {
            font-size: var(--z32px);
            color: rgb(250, 255, 212);
            font-family: Honglei;
            -webkit-writing-mode: vertical-lr;
            writing-mode: vertical-lr;
            letter-spacing: calc(2 * var(--z1px));
            margin-top: -20px;
        }
    }
}

@media (max-width: 480px){
 .ScJti{
    // --z80px:5rem;
    // --z1px:.0625rem;
    // --z32px:2rem;
    background: url(@/assets/pcimg/activity/h_bg.png) center center / cover no-repeat;
    .bg_flf{
        width: 42.1%;
        left: 0px;
        top: 27%;

    }
    .bg_jxk{
        width: 49.8%;
        left: 100%;
        top: 36%;
        transform: translateX(-100%);
        img{
            transform: scaleX(-1);
        }
        .divText{
            left: 62%;
            top: -11%;
        }
    }
    .bg_lyt{
        width: 73%;
        left: 0px;
        top: 48%;
        transform: translatex(-58%);
        .divText{
            left: 100%;
            top: 0%;
        }
    }
    .bg_jsc{
        width: 100%;
        left: 0px;
        bottom: 0px;
        .img{
            width: 100%;
            float: left;
            position: relative;
        }
        .divText {
            right: 34%;
            top: -29%;
        }
    }
}
}
.hidden {
    overflow: hidden;
}
.h100 {
    height: 100%;
}
.w100 {
    width: 100%;
}
.absolute {
    position: absolute;
}
.z2 {
    z-index: 2;
}
.z5 {
    z-index: 5;
}
.flex-xy-center {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.flex-column {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
}
.flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
</style>