import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, type Mock } from 'vitest';
import { useRouter } from 'vue-router';
import useMutationCar from '@/queries/useCarQueries';
import CreateCarForm from '../CreateCarForm.vue';
import { nextTick } from 'vue';

vi.mock('@/queries/useCarQueries');
vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}));

describe('MyComponent', () => {
  it('should submit the form and call mutate with correct data', async () => {
    const mutateMock = vi.fn();
    (useMutationCar as Mock).mockReturnValue({
      createCar: {
        mutate: mutateMock,
        isPending: true,
        error: 'dfgdf',
      },
    });

    const pushMock = vi.fn();
    (useRouter as Mock).mockReturnValue({
      push: pushMock,
    });

    const wrapper = mount(CreateCarForm);

    await wrapper.find('input#brand').setValue('hjghjghj');
    await wrapper.find('input#model').setValue('Corfgghfgholla');
    await wrapper.find('input#year').setValue(2020);

    await wrapper.find('form').trigger('submit.prevent');

    expect(mutateMock).toHaveBeenCalledWith({
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
    });
  });

  it('should disable the submit button when isPending is true', async () => {
    (useMutationCar as Mock).mockReturnValue({
      createCar: {
        mutate: vi.fn(),
        isPending: true,
        error: null,
      },
    });

    const wrapper = mount(CreateCarForm);

    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('should display error message when mutation fails', async () => {
    const mockError = { message: 'Failed to create car' };
    (useMutationCar as Mock).mockReturnValue({
      createCar: {
        mutate: vi.fn(),
        isPending: false,
        error: mockError,
      },
    });

    const wrapper = mount(CreateCarForm);

    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain(mockError.message);
  });

  it('should navigate to /cars after successful creation', async () => {
    const mutateMock = vi.fn((formData, options) => {
      if (options && options.onSuccess) {
        options.onSuccess();
      }
    });

    (useMutationCar as Mock).mockReturnValue({
      createCar: {
        mutate: mutateMock,
        isPending: false,
        error: null,
      },
    });

    const wrapper = mount(CreateCarForm);

    await wrapper.find('input#brand').setValue('Toyota');
    await wrapper.find('input#model').setValue('Corolla');
    await wrapper.find('input#year').setValue(2020);

    await wrapper.find('form').trigger('submit.prevent');
    await nextTick();

    expect(mutateMock).toHaveBeenCalledWith({
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
    });
  });
});
