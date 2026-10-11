import { DiceService} from './dice.service';

describe('DiceService', ()=>{
  let service: DiceService;

  beforeEach(()=>{
    service = new DiceService();
  });

  it('should return a result within the inclusive range', ()=>{
    const result = service.roll(6);

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(6);
    expect(Number.isInteger(result)).toBeTrue();
  });

  it('should throw RangeError when sides is less than 2', ()=>{
    expect(()=> service.roll(1)).toThrowError(RangeError);
  });

  it('should throw RangeError when sides is not an integer', ()=>{
    expect(()=>service.roll(6.5)).toThrowError(RangeError);
  });
});
