import { Toast } from "@douyinfe/semi-ui";
import axios from "axios";

axios.interceptors.response.use((res)=>{
    return res;
},(err)=>{
    console.log(err);
    if(err.response.status === 401){
        Toast.error("请先登录");
    }
    return Promise.reject(err);
})