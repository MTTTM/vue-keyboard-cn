import { expect } from 'chai'
import Regx from "../src/dev/inputFilterRegx.js"


describe('float', () => {
  it('float params 1 should be false',  () => {
    expect(Regx.float(1)).to.equal(false);
  })
  it('float params 1.1 should be false',  () => {
    expect(Regx.float(1.1)).to.equal(false);
  })
  it('float params "1.10" should be true',  () => {
    //如果最后一个小数是0必须先传递字符串
    expect(Regx.float(1.10.toFixed(2))).to.equal(true);
  })
  it('float params 1.11 should be true',  () => {
    expect(Regx.float(1.11)).to.equal(true);
  })
  it('float params (1.1,1) should be true',  () => {
    expect(Regx.float(1.1,1)).to.equal(true);
  })

})

describe('int', () => {
  it('int params 1 should be true',  () => {
    expect(Regx.int(1)).to.equal(true);
  })
  it('int params 1.1 should be false',  () => {
    expect(Regx.int(1.1)).to.equal(false);
  })
})

describe('cn', () => {
  it('cn params 1 should be false',  () => {
    expect(Regx.cn(1)).to.equal(false);
  })
  it('cn params `你好` should be true',  () => {
    expect(Regx.cn(`你好`)).to.equal(true);
  })
  it('cn params `你·好` should be true',  () => {
    expect(Regx.cn(`你·好`)).to.equal(true);
  })
  it('cn params `你好.` should be false',  () => {
    expect(Regx.cn(`你好.`)).to.equal(false);
  })
  it('cn params `hello` should be false',  () => {
    expect(Regx.cn(`hello`)).to.equal(false);
  })
})
describe('en', () => {
  it('en params `hello` should be true',  () => {
    expect(Regx.en(`hello`)).to.equal(true);
  })
  it('en params `hello,world` should be false',  () => {
    expect(Regx.en(`hello,world`)).to.equal(false);
  })
})