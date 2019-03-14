import api30 from './3.x/api'
import api12 from './1.x/api'

const api = {
    '3.x': {...api30},
    '1.x': {...api12}
};

export default api;