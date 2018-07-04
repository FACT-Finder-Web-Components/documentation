import {store} from './../store';
import PolymerRedux from 'polymer-redux/polymer-redux';

const Mixin = PolymerRedux(store);

export default function ReduxMixin(proto) {
    return Mixin(proto);
};