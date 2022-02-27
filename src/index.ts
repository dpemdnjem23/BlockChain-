import Blockchain from "./Blockchain";
import BlockCrypto from "./BlockCrypto";


const blockChain = new Blockchain();

console.log("블록체인 생성중")

blockChain.addNewBlock(
    new BlockCrypto(1,Date.now(),{
        sender:"이상혁",
        receives:"이승현",
        content:"너 오늘 좀한다.",
    })
);

    
blockChain.addNewBlock(
    new BlockCrypto(2,Date.now(),{
        sender:"리형",
        receiver:"두두두",
        content:"주문 들어왔음"    
        })
    

);

console.log(JSON.stringify(blockChain,null,4) );

if(blockChain.isValidChain()){
    console.log("유효한 블록체인 입니다.")
}
else{
    console.log("유효하지 않은 블록체인")
}