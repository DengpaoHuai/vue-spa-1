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

    const wrapper = mount(PlanetListComposable);

    await nextTick();
    const planetNames = wrapper.findAll('p');
    expect(planetNames).toHaveLength(2);
    expect(planetNames[0].text()).toBe('Tatooine');
    expect(planetNames[1].text()).toBe('Alderaan');
  });

  it('should handle loading state', async () => {
    (useFetch as Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    const wrapper = mount(PlanetListComposable);

    await nextTick();
    expect(wrapper.text()).toContain('loading...');
  });

  it('should handle error state', async () => {
    const mockError = 'Failed to fetch planets';
    (useFetch as Mock).mockReturnValue({
      data: null,
      loading: false,
      error: mockError,
    });

    const wrapper = mount(PlanetListComposable);

    await nextTick();
    expect(wrapper.text()).toContain(`error : ${mockError}`);
  });

  it('should push to demo page when button is clicked', async () => {
    (useFetch as Mock).mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    const pushMock = vi.fn();
    (useRouter as Mock).mockReturnValue({
      push: pushMock,
    });

    const wrapper = mount(PlanetListComposable);

    await wrapper.find('button').trigger('click');

    expect(pushMock).toHaveBeenCalledWith('/demo');
  });

  it('should add and remove scroll event listener', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const wrapper = mount(PlanetListComposable);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );

    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
  });
});
