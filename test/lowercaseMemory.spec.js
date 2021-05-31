import { expect } from 'chai'
import {getCaseItem,setCaseItem} from "../src/dev/lowercaseMemory"


describe('getCaseItem', () => {
  it('getCaseItem() should be false',  () => {
    localStorage.clear()
    expect(getCaseItem()).to.equal("capitalize");
  })
  it('after setCaseItem(),getCaseItem() should be false',  () => {
    localStorage.clear()
    setCaseItem();
    expect(getCaseItem()).to.equal("capitalize");
  })
  it('after setCaseItem("1"),getCaseItem() should be false',  () => {
    localStorage.clear()
    setCaseItem("1")
    expect(getCaseItem()).to.equal("lowercase");
  })

})