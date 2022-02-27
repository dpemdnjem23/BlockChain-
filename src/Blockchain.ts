import BlockCrypto from "./BlockCrypto";

class Blockchain{
    private blockChain: BlockCrypto[];
    
    constructor(){
        this.blockChain = [this.initGenesisBlock()];
    }

    //블록체인의 첫 번째 블록 생성
    //이 블록은 아직 연결되지 않은 상태

    private initGenesisBlock(): BlockCrypto{
        return new BlockCrypto(0,Date.now(),"나의 첫 블록체인!","0")
    }

    //블록체인에 추가된 마지막 블록을 찾는데 사용한다.
    private obtainLatestBlock(): BlockCrypto {
        return this.blockChain[this.blockChain.length-1]
    }
    //새로운 블록을 블록체인에 추가 한다.
    //새로운 블록의 prevHash 에는 블록체인의 마지막 블록의 Hash 가 설정되어
    //블록체인의 변조를 최소화 하거나 방지
    public addNewBlock(newBlock: BlockCrypto) {
        newBlock.setPrevHash(this.obtainLatestBlock().getHash());
        newBlock.setHash(newBlock.computeHash());
        this.blockChain.push(newBlock);
      }

      //블록체인에 있는 모든 블록의 prevHash와 hash가 서로를 카르키는지 확인하여 
      //hash가 변조되었는지를 여부를 확인한다.
      //블록체인의 무결성이 손상된 경우 false를 반환한다.
      
    public isValidChain(): boolean {
      for (let index=1 ; index< this.blockChain.length; index++){
          const currentBlock = this.blockChain[index]; // 현재 블록
          const prevHash = this.blockChain[index-1] // 이전 해쉬 => 블록체인 위변조 방지
          if(currentBlock.getHash() !== currentBlock.computeHash()) return false
          if(currentBlock.getPrevHash() !== prevHash.getHash()) return false

      }
      return true
    }

}
export default Blockchain;