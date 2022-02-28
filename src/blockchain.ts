//암호화를 위해 crypto를 불러온ㄷ => 블록체인은 해쉬 함수 사용
import { createHash } from "crypto";
//node.js 클래스
class Block {
  //블록체인의 모든 블록의 index를 추적하는 수사
  public index: number;
  //트랜 잭션 완료시간

  public hash: any

  public prevHash: string;

  public currentTime: number;
  //블록에 기록되는 데이터
  public data: string;
  //체인에서 이전 블록의 hash key를 가리키고 있는다. 블록체인의 무결성 유지 하는데 사용

  //해당 블록이 가지고 있는 hash kye
 

  // difficulty: number;
  
  // nonce: string;

  constructor(index: number ,hash:any ,data: string, currentTime: number, prevHash :string) {
    this.index = index;
    this.hash = hash;
    this.prevHash = prevHash;
  
    this.currentTime = currentTime;  
    this.data = data;
   
  }
}
  //index,prevhash, currenttime,data를 기반으로 hash를 만드는데 사용한다.
  //@returns sha256으로 생성된 블록의 hash key

  //computehash hash 계산용 매서드 만든다.
const calculateHash  = (index:number,prevHash:string,currentTime:number,data:any):string =>{
  return createHash("sha256")
      .update(
        index + prevHash + currentTime + JSON.stringify(data).toString()
      )
      .digest("hex");
      //!!json.stringify => json 형태로 바꿔준다.
  }

  console.log(calculateHash)
//초기 블록
const genesisBlock: Block = new Block(
  // 위의 블록구조 처럼 index, hash, previousHash, timestamp, data 순으로 정보가 기입되어있음을 알 수 있다. 
  0, '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7', null, 1465154705, 'my genesis block!!'
);
let blockchain: Block[] = [genesisBlock];

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];
//블록생성
const generateBlock = (data:string) =>{

 const previousBlock:Block = getLatestBlock();
 const nextIndex: number = previousBlock.index+1
 const nextCurrenTime :number = new Date().getTime()/1000;

 const nextHash: any = calculateHash(nextIndex,previousBlock.hash,nextCurrenTime,data)
 const newBlock:Block = new Block(nextIndex,nextHash,previousBlock.hash,nextCurrenTime,data)

 return newBlock


}
//블록체인 저장


//블록 무결성 검증
// 블록의 인덱스는 이전보다 커야한다 => 새로운 블록이 생겻다
// 블록의 previousHash과 이전블록의 hash일치
//해쉬 블록이 유효해야하낟.