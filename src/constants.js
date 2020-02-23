module.exports.cardNames = [
    'al',  //安陆
    'ar',  //阿阮
    'bcg', //百草谷
    'blts', //百里屠苏
    'bsd', //百胜刀
    'ca',  //长安
    'fl',
    'fls',
    'fqx',
    'sx',
    'xf',
    'xl',
    'ywy',
    'xy',
    'yq',
    'qy',
    'hy',
    'yqs',
    'wry',
    'oysg',
    'qhzr',
    'xyz',
    'sy',
    'ly',
    'hyue',
    'qc',
    'tyc',
    'ws',
    'pl',
    'qyt',
    'zrl',
    'ys',
    'ths',
    'yd',
    'lyc',
    'zm',
    'lc',
    'hllp',
    'gjfj',
    'gjhy',
    'qysnp',
    'jt',
    'ttzq',
    'wmzj',
    'jql',
    'tzbz',
    'gjhg',
    'wc',
    'hykh',
    'thg',
    'jsh',
    'snm'
];

module.exports.events = {
    CREATE_PLAYER_ID: 'CREATE_PLAYER_ID',

    PAIRING: 'PAIRING',
    START: 'START',
    SELECT_CARD: 'SELECT_CARD'
};

module.exports.pairs = [
    {
        name: '焚焰血戮',
        cards: ['blts', 'gjfj'],
        points: 3
    },
    {
        name: '乘龙归',
        cards: ['blts', 'qy'],
        points: 3
    },
    {
        name: '故友赠礼',
        cards: ['blts', 'hllp'],
        points: 3
    },
    {
        name: '云涌昆仑',
        cards: ['blts', 'tyc'],
        points: 3
    },
    {
        name: '琴心剑魄',
        cards: ['blts', 'oysg'],
        points: 3
    },
    {
        name: '天墉掌门',
        cards: ['ly', 'tyc'],
        points: 4
    },
    {
        name: '天墉旧事',
        cards: ['blts', 'ly', 'tyc'],
        points: 10
    },
    {
        name: '与子成说',
        cards: ['blts', 'fqx'],
        points: 3
    },
    {
        name: '桃花幻梦',
        cards: ['blts', 'fqx', 'thg'],
        points: 10
    },
    {
        name: '黑衣少侠传',
        cards: ['yqs', 'hy', 'fls', 'fqx', 'xl', 'blts'],
        points: 60
    },
    {
        name: '幽都灵女',
        cards: ['fqx', 'yd'],
        points: 4
    },
    {
        name: '幽都巫咸',
        cards: ['yqs', 'yd'],
        points: 4
    },
    {
        name: '陌相逢',
        cards: ['fqx', 'yqs'],
        points: 4
    },
    {
        name: '幽夜苍茫',
        cards: ['fqx', 'yqs', 'yd'],
        points: 10
    },
    {
        name: '厨房功夫',
        cards: ['fqx', 'xy', 'jt'],
        points: 10
    },
    {
        name: '望乡',
        cards: ['fls', 'qc'],
        points: 4
    },
    {
        name: '无情客',
        cards: ['fls', 'bsd'],
        points: 4
    },
    {
        name: '永相随',
        cards: ['fls', 'qysnp'],
        points: 4
    },
    {
        name: '故林栖',
        cards: ['xl', 'zrl'],
        points: 4
    },
    {
        name: '丹芷长老',
        cards: ['oysg', 'qyt'],
        points: 4
    },
    {
        name: '故地重回',
        cards: ['oysg', 'ys'],
        points: 4
    },
    {
        name: '揽琴独照',
        cards: ['oysg', 'fl'],
        points: 4
    },
    {
        name: '榣山遗韵',
        cards: ['oysg', 'qy'],
        points: 4
    },
    {
        name: '栖身之所',
        cards: ['oysg', 'pl'],
        points: 4
    },
    {
        name: '琴川友',
        cards: ['oysg', 'fls'],
        points: 4
    },
    {
        name: '醉梦江湖',
        cards: ['oysg', 'yqs'],
        points: 4
    },
    {
        name: '仙山眷侣',
        cards: ['oysg', 'xf'],
        points: 4
    },
    {
        name: '蓬莱公主',
        cards: ['xf', 'pl'],
        points: 4
    },
    {
        name: '芳华如梦',
        cards: ['xf', 'oysg', 'pl'],
        points: 10
    },
    {
        name: '剑舞红袖',
        cards: ['hy', 'gjhy'],
        points: 4
    },
    {
        name: '明月青霜',
        cards: ['hy', 'al'],
        points: 4
    },
    {
        name: '千古剑灵',
        cards: ['hy', 'tyc'],
        points: 4
    },
    {
        name: '水虺醉琴',
        cards: ['qy', 'ys'],
        points: 4
    },
    {
        name: '应龙信物',
        cards: ['qy', 'hllp'],
        points: 4
    },
    {
        name: '古剑剑灵',
        cards: ['hy', 'yq'],
        points: 4
    },
    {
        name: '历劫重生',
        cards: ['yq', 'wmzj'],
        points: 4
    },
    {
        name: '未成之剑',
        cards: ['yq', 'gjhg'],
        points: 4
    },
    {
        name: '铸剑仙师',
        cards: ['yq', 'zm'],
        points: 4
    },
    {
        name: '千年一器',
        cards: ['gjhg', 'wmzj', 'zm'],
        points: 10
    },
    {
        name: '天地熔炉',
        cards: ['gjhg', 'wmzj', 'zm', 'yq'],
        points: 20
    },
    {
        name: '古剑奇谭',
        cards: ['gjfj', 'gjhy', 'wmzj', 'zm', 'gjhg'],
        points: 40
    },
    {
        name: '家传宝贝',
        cards: ['ywy', 'gjhg'],
        points: 5
    },
    {
        name: '剑主之谊',
        cards: ['ywy', 'yq', 'gjhg'],
        points: 10
    },
    {
        name: '玉京游',
        cards: ['ywy', 'ca'],
        points: 4
    },
    {
        name: '春风雨',
        cards: ['ywy', 'xy'],
        points: 4
    },
    {
        name: '比肩行',
        cards: ['ywy', 'wry'],
        points: 5
    },
    {
        name: '长相忆',
        cards: ['ywy', 'jql', 'wry'],
        points: 10
    },
    {
        name: '星海天罡',
        cards: ['wry', 'bcg'],
        points: 5
    },
    {
        name: '蓝衫偃师记',
        cards: ['wry', 'ar', 'xyz', 'ywy'],
        points: 20
    },
    {
        name: '逸尘',
        cards: ['ths', 'xyz'],
        points: 5
    },
    {
        name: '太华山人',
        cards: ['qhzr', 'ths'],
        points: 4
    },
    {
        name: '严师胜父',
        cards: ['xyz', 'qhzr'],
        points: 4
    },
    {
        name: '温茶相待',
        cards: ['qhzr', 'ths', 'xyz'],
        points: 10
    },
    {
        name: '待佳期',
        cards: ['xyz', 'lc'],
        points: 4
    },
    {
        name: '光逐影',
        cards: ['ar', 'xyz'],
        points: 5
    },
    {
        name: '共株生',
        cards: ['ar', 'lc'],
        points: 4
    },
    {
        name: '芳草心',
        cards: ['ar', 'zm'],
        points: 4
    },
    {
        name: '山鬼',
        cards: ['ar', 'ws'],
        points: 5
    },
    {
        name: '神女静眠',
        cards: ['snm', 'ws'],
        points: 4
    },
    {
        name: '露草流萤',
        cards: ['ar', 'ws', 'lc'],
        points: 10
    },
    {
        name: '别破军',
        cards: ['xy', 'wc'],
        points: 4
    },
    {
        name: '胡不归',
        cards: ['xy', 'lyc'],
        points: 4
    },
    {
        name: '空留忆',
        cards: ['xy', 'ttzq'],
        points: 4
    },
    {
        name: '重山隐',
        cards: ['xy', 'jsh'],
        points: 4
    },
    {
        name: '孤月寒灯',
        cards: ['xy', 'sy'],
        points: 4
    },
    {
        name: '永夜寒沉',
        cards: ['sy', 'lyc'],
        points: 4
    },
    {
        name: '月中生',
        cards: ['lyc', 'sx',],
        points: 4
    },
    {
        name: '伴长眠',
        cards: ['tzbz', 'sx'],
        points: 4
    },
    {
        name: '三日遥',
        cards: ['sy', 'sx'],
        points: 4
    },
    {
        name: '月之殇',
        cards: ['lyc', 'hyue'],
        points: 4
    },
    {
        name: '护孤城',
        cards: ['sy', 'hyue'],
        points: 4
    },
    {
        name: '廉贞曲',
        cards: ['hyue', 'hykh'],
        points: 4
    },
    {
        name: '烈山遗族',
        cards: ['sx', 'xy', 'hyue', 'sy'],
        points: 20
    },
    {
        name: '红月',
        cards: ['sx', 'xy', 'hyue', 'sy', 'lyc'],
        points: 40
    }
];