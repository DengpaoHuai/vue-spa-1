import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, type Mock } from 'vitest';
import { nextTick } from 'vue';
import { useRouter } from 'vue-router';
import useFetch from '@/composables/useFetch';
import PlanetListComposable from '../PlanetListComposable.vue';

vi.mock('@/composables/useFetch');
vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}));

describe('MyComponent', () => {
  it('should fetch planets and display them', async () => {
    // Mock du hook useFetch
    const mockData = {
      results: [
        { name: 'Tatooine', url: 'http://swapi.dev/api/planets/1/' },
        { name: 'Alderaan', url: 'http://swapi.dev/api/planets/2/' },
      ],
    };
    (useFetch as Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    // Mock du router
    const pushMock = vi.fn();
    (useRouter as Mock).mockReturnValue({
      push: pushMock,
    });

    // Monter le composant
    const wrapper = mount(PlanetListComposable);

    // Vérifier que les planètes sont bien affichées
    await nextTick();
    const planetNames = wrapper.findAll('p');
    expect(planetNames).toHaveLength(2);
    expect(planetNames[0].text()).toBe('Tatooine');
    expect(planetNames[1].text()).toBe('Alderaan');
  });

  it('should handle loading state', async () => {
    // Mock du hook useFetch pour simuler le loading
    (useFetch as Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    const wrapper = mount(PlanetListComposable);

    // Vérifier que l'état "loading" est affiché
    await nextTick();
    expect(wrapper.text()).toContain('loading...');
  });

  it('should handle error state', async () => {
    // Mock du hook useFetch pour simuler une erreur
    const mockError = 'Failed to fetch planets';
    (useFetch as Mock).mockReturnValue({
      data: null,
      loading: false,
      error: mockError,
    });

    const wrapper = mount(PlanetListComposable);

    // Vérifier que l'erreur est bien affichée
    await nextTick();
    expect(wrapper.text()).toContain(`error : ${mockError}`);
  });

  it('should push to demo page when button is clicked', async () => {
    // Mock du hook useFetch
    (useFetch as Mock).mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    // Mock du router
    const pushMock = vi.fn();
    (useRouter as Mock).mockReturnValue({
      push: pushMock,
    });

    const wrapper = mount(PlanetListComposable);

    // Simuler un clic sur le bouton
    await wrapper.find('button').trigger('click');

    // Vérifier que le push a été appelé
    expect(pushMock).toHaveBeenCalledWith('/demo');
  });

  it('should add and remove scroll event listener', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const wrapper = mount(PlanetListComposable);

    // Vérifier que l'événement de défilement est ajouté au montage
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );

    // Détruire le composant
    wrapper.unmount();

    // Vérifier que l'événement de défilement est supprimé au démontage
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
  });
});
