import xs from 'xstream';
import { span } from '@cycle/dom';

export default function () {
  return xs.of(span('.loadding'));
}
