import { expect, test } from "vitest";
import type { DynamicValue, FixedValue, FunctionValue, Value } from "./types";
import { dynamic, fixed, replace } from "./values";
import { value } from "./helpers";

test('value', async () => {

    const fixedValue: Value = fixed("hello");
    const dynamicValue: Value = dynamic(input => input);
    const functionValue: Value = replace(["replaced", "regular"], ["replaced", "regular"]);

    let shouldBeFixed = false;
    
    value.isFixedValue(fixedValue, () => shouldBeFixed = true);
    value.isFixedValue(dynamicValue, () => shouldBeFixed = false)
    value.isFixedValue(functionValue, () => shouldBeFixed = false);

    expect(shouldBeFixed).toBeTruthy();

    let shouldBeDynamic = false;

    value.isDynamicValue(dynamicValue, () => shouldBeDynamic = true)
    value.isDynamicValue(fixedValue, () => shouldBeDynamic = false)
    value.isDynamicValue(functionValue, () => shouldBeDynamic = false)
    
    expect(shouldBeDynamic).toBeTruthy()

    let shouldBeFunction = false;

    value.isFunctionValue(functionValue, () => shouldBeFunction = true)
    value.isFunctionValue(fixedValue, () => shouldBeFunction = false)
    value.isFunctionValue(dynamicValue, () => shouldBeFunction = false);
});