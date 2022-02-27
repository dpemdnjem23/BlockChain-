import BlockCrypto from "./BlockCrypto";

class Blockchain {
  private blockChain: BlockCrypto[];

  constructor() {
    this.blockChain = [this.initGenesisBlock()];
  }


//     블록체인의 첫 번째 블록을 생성합니다.
//    이 블록은 다른 블록과 연결되지 않은 상태입니다.
//   록체인의 첫 번째 블록

  private initGenesisBlock(): BlockCrypto {
    return new BlockCrypto(0, Date.now(), "나의 첫 블록체인!", "0");
  }

//  
//    블록체인에 추가된 마지막 블록을 찾는 데 사용합니다.
//    returns 블록체인의 마지막 블록
//    
  private obtainLatestBlock(): BlockCrypto {
    return this.blockChain[this.blockChain.length - 1];
  }

//   
//    새로운 블록을 블록체인에 추가 합니다.
//    새로운 블록의 prevHash에는 블록체인의 마지막 블록의 Hash가 설정되어
//    블록체인의 변조를 최소화하거나 방지합

//    
  public addNewBlock(newBlock: BlockCrypto) {
    newBlock.setPrevHash(this.obtainLatestBlock().getHash());
    newBlock.setHash(newBlock.computeHash());
    this.blockChain.push(newBlock);
  }

 
    // 블록체인에 있는 모든 블록의 prevHash와 hash가 서로를 가리키는지 확인하여
    // Hash가 변조되었는지를 여부를 확인합니다.
   //블록체인의 무결성이 손상된 경우 false를 반환합니다.
   
  public isValidChain(): boolean {
    for (let index = 1; index < this.blockChain.length; index++) {
      const currentBlock = this.blockChain[index];
      const prevHash = this.blockChain[index - 1];
      if (currentBlock.getHash() !== currentBlock.computeHash()) return false;
      if (currentBlock.getPrevHash() !== prevHash.getHash()) return false;
    }
    return true;
  }
}

export default Blockchain;