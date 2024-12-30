import {$} from '../core/dom';

export function Loader() {
  return $.create('div', 'loader').html(`
    <div class="lds-hourglass"></div>
  `)
}
