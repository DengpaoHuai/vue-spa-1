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
    // Mock de la mutation useMutationCar
    const mutateMock = vi.fn();
    (useMutationCar as Mock).mockReturnValue({
      createCar: {
        mutate: mutateMock,
        isPending: false,
        error: null,
      },
    });

    // Mock du router
    const pushMock = vi.fn();
    (useRouter as Mock).mockReturnValue({
      push: pushMock,
    });

    // Monter le composant
    const wrapper = mount(CreateCarForm);

    // Remplir le formulaire
    await wrapper.find('input#brand').setValue('Toyota');
    await wrapper.find('input#model').setValue('Corolla');
    await wrapper.find('input#year').setValue(2020);

    // Simuler la soumission du formulaire
    await wrapper.find('form').trigger('submit.prevent');

    // Vérifier que mutate a été appelé avec les bonnes données
    expect(mutateMock).toHaveBeenCalledWith({
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
    });
  });

  it('should disable the submit button when isPending is true', async () => {
    // Mock de la mutation avec isPending à true
    (useMutationCar as Mock).mockReturnValue({
      createCar: {
        mutate: vi.fn(),
        isPending: true,
        error: null,
      },
    });

    const wrapper = mount(CreateCarForm);

    // Vérifier que le bouton est désactivé lorsque isPending est true
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('should display error message when mutation fails', async () => {
    const mockError = { message: 'Failed to create car' };
    // Mock de la mutation avec une erreur
    (useMutationCar as Mock).mockReturnValue({
      createCar: {
        mutate: vi.fn(),
        isPending: false,
        error: mockError,
      },
    });

    const wrapper = mount(CreateCarForm);

    // Vérifier que le message d'erreur s'affiche
    await wrapper.vm.$nextTick(); // Attendre que le DOM soit mis à jour
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

    // Vérifier que la mutation a bien été appelée avec les bonnes données
    expect(mutateMock).toHaveBeenCalledWith({
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
    });
  });
});
