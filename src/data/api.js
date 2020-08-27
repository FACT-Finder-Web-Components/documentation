import api4x from './4.x/api'
import api3x from './3.x/api'
import api1x from './1.x/api'

const api = {
    '4.x': {...api4x},
    '3.x': {...api3x},
    '1.x': {...api1x}
};

export default api;
