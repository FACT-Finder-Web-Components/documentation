import guides5x from './5.x/guides'
import guides4x from './4.x/guides'
import guides3x from './3.x/guides'
import guides1x from './1.x/guides'

const api = {
    '5.x': {...guides5x},
    '4.x': {...guides4x},
    '3.x': {...guides3x},
    '1.x': {...guides1x}
};

export default api;
