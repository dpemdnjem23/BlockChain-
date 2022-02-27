//암호화를 위해 crypto를 불러온ㄷ => 블록체인은 해쉬 함수 사용
import { createHash } from "crypto";
//node.js 클래스
class BlockCrypto {
  //블록체인의 모든 블록의 index를 추적하는 수사
  private index: number;
  //트랜 잭션 완료시간
  private currentTime: number;
  //블록에 기록되는 데이터
  private data: any;
  //체인에서 이전 블록의 hash key를 가리키고 있는다. 블록체인의 무결성 유지 하는데 사용
  private prevHash: string;
  //해당 블록이 가지고 있는 hash kye
  private hash: string;

  constructor(index: number, currentTime: number, data: any, prevHash = "") {
    this.index = index;
    this.currentTime = currentTime;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.computeHash();
  }
  //prevhash, currenttime,data를 기반으로 hash를 만드는데 사용한다.
  //@returns sha256으로 생성된 블록의 hash key

  //computehash hash 계산용 매서드 만든다.
  public computeHash(): string {
      //단방향 암호화 방식
    return createHash("sha256")
      .update(
        this.prevHash + this.currentTime + JSON.stringify(this.data).toString()
      )
      .digest("hex");
      //json.stringify => json 형태로 바꿔준다.
  }

  public getIndex(): number {
      return this.index;
  }
  public getCurrentTime(): number{
      return this.currentTime
  }
  public getData(): any{
      return this.data
  }
  public getPrevHash(): string{
      return this.prevHash
  }
  public setPrevHash(prevHash:string):string{
      return (this.prevHash= prevHash);
  }
  public getHash():string{
      return this.hash
  }
  public setHash(hash:string):string{
      return (this.hash=hash)
  }
}
export default BlockCrypto;