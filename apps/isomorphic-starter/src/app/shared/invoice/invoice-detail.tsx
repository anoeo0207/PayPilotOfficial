'use client';

import { Text, Button, Input, Textarea, ActionIcon } from 'rizzui';
import { useFieldArray, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { calculateTotalPrice } from 'isomorphic-core/src/utils/calculate-total-price';
import { PiMinusBold, PiPlusBold, PiTrashBold } from 'react-icons/pi';
import { FormBlockWrapper } from '@/app/shared/invoice/form-utils';

// quantity component for invoice
function QuantityInput({
  name,
  error,
  onChange,
  defaultValue,
}: {
  name?: string;
  error?: string;
  onChange?: (value: number) => void;
  defaultValue?: number;
}) {
  const [value, setValue] = useState(defaultValue ?? 1);

  function handleIncrement() {
    let newValue = value + 1;
    setValue(newValue);
    onChange && onChange(newValue);
  }

  function handleDecrement() {
    let newValue = value > 1 ? value - 1 : 1;
    setValue(newValue);
    onChange && onChange(newValue);
  }

  function handleOnChange(inputValue: number) {
    setValue(Number(inputValue));
    onChange && onChange(inputValue);
  }

  useEffect(() => {
    setValue(defaultValue ?? 1);
    onChange && onChange(defaultValue ?? 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Input
      label="Quantity"
      type="number"
      min={1}
      name={name}
      value={value}
      placeholder="1"
      onChange={(e) => handleOnChange(Number(e.target.value))}
      suffix={
        <>
          <ActionIcon
            title="Decrement"
            size="sm"
            variant="outline"
            className="scale-90 shadow-sm"
            onClick={() => handleDecrement()}
          >
            <PiMinusBold className="h-3.5 w-3.5" strokeWidth={2} />
          </ActionIcon>
          <ActionIcon
            title="Increment"
            size="sm"
            variant="outline"
            className="scale-90 shadow-sm"
            onClick={() => handleIncrement()}
          >
            <PiPlusBold className="h-3.5 w-3.5" strokeWidth={2} />
          </ActionIcon>
        </>
      }
      suffixClassName="flex gap-1 items-center -me-2"
      error={error}
    />
  );
}

// multiple invoice items generate component
export function AddInvoiceItems({ watch, register, control, errors }: any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  const shippingCost = watch('shipping') as number;
  const discount = watch('discount') as number;
  const taxes = watch('taxes') as number;

  function calculateSubTotal(): number {
    let subTotal = 0;
    return subTotal as number;
  }

  return (
    <FormBlockWrapper
      title={'Invoice Details:'}
      description={'Complete invoice details'}
      className="pt-7 @2xl:pt-9 @3xl:pt-11"
    >
      <div className="col-span-2 @container">
        {fields.map((field: any, index) => {
          const priceValue = watch(
            `items.${index}.price`,
            field.price ?? 0
          ) as number;

          const quantityValue = watch(
            `items.${index}.quantity`,
            field.quantity ?? 1
          ) as number;

          return (
            <div
              key={field.id}
              className="mb-8 grid grid-cols-1 items-start rounded-lg border border-muted p-4 shadow @md:p-5 @xl:p-6"
            >
              <div className="grid w-full items-start gap-3 @md:grid-cols-2 @lg:gap-4 @xl:grid-cols-3 @2xl:gap-5 @4xl:grid-cols-4">
                <div className="flex items-start @xl:col-span-1 @2xl:col-span-1">
                  <Input
                    label="Amount"
                    type="number"
                    prefix={'$'}
                    placeholder="100"
                    {...register(`items.${index}.price`)}
                    defaultValue={field.price}
                    error={errors?.items?.[index]?.price?.message}
                    className="w-full"
                  />
                </div>
                <div className="ms-3 mt-9 flex items-start text-sm">
                    <Text className="me-1 text-gray-500">Total:</Text>
                    <Text as="b" className="font-medium">
                      ${priceValue * quantityValue}
                    </Text>
                  </div>
                <Textarea
                  label="Note"
                  placeholder="Enter invoice note here"
                  {...register(`items.${index}.description`)}
                  defaultValue={field.description}
                  error={errors?.items?.[index]?.description?.message}
                  className="row-start-2 @md:col-span-2 @xl:col-span-3 @xl:row-start-2 @4xl:col-span-4"
                  textareaClassName="h-20"
                />
              </div>
            </div>
          );
        })}

        <div className="flex w-full flex-col items-start justify-between @4xl:flex-row @4xl:pt-6">
          <div className="grid w-full gap-2 @4xl:w-auto">
            <div className="ms-auto mt-6 grid w-full gap-3.5 text-sm text-gray-600 @xl:max-w-xs">
              <Text className="flex items-center justify-between text-base font-semibold text-gray-900">
                Total:{' '}
                <Text as="span">
                  $
                  {calculateTotalPrice(
                    calculateSubTotal()
                  ) ?? '--'}
                </Text>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </FormBlockWrapper>
  );
}
