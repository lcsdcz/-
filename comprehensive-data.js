// 高考理解性默写真题数据库 - 完整版
const comprehensiveDatabase = {
    // 按文章分类的题目
    articles: {
        '论语十二章': {
            id: '论语十二章',
            title: '《论语》十二章',
            author: '孔子',
            dynasty: '春秋',
            questions: [
                {
                    id: 'lunyu_1',
                    type: 'understanding',
                    question: '在《〈论语〉十二章》中，孔子用反问语气强调人要有仁爱之心，否则遵守礼仪也没什么用的句子是：______',
                    answer: '人而不仁，如礼何？',
                    category: '仁礼论'
                },
                {
                    id: 'lunyu_2',
                    type: 'understanding',
                    question: '在《〈论语〉十二章》中，孔子用反问语气强调人要有仁爱之心，否则奏乐也不管用的句子是：______',
                    answer: '人而不仁，如乐何？',
                    category: '仁礼论'
                },
                {
                    id: 'lunyu_3',
                    type: 'understanding',
                    question: '在《〈论语〉十二章》中，孔子认为要克制自己，按照礼的要求去做的句子是：______',
                    answer: '克己复礼为仁',
                    category: '仁礼论'
                },
                {
                    id: 'lunyu_4',
                    type: 'understanding',
                    question: '在《〈论语〉十二章》中，反映了"君子"和"小人"不同的价值追求的句子是：_______，_______',
                    answer: '君子喻于义，小人喻于利',
                    category: '君子论'
                },
                {
                    id: 'lunyu_5',
                    type: 'understanding',
                    question: '在《〈论语〉十二章》中，曾子认为读书人(有志之士)不可以不弘大刚强而有毅力的原因是：_______，_______',
                    answer: '士不可以不弘毅，任重而道远',
                    category: '君子论'
                },
                {
                    id: 'lunyu_6',
                    type: 'understanding',
                    question: '在《〈论语〉十二章》中，既强调榜样的良好作用，又强调要自我反思的句子是：_______，_______',
                    answer: '见贤思齐焉，见不贤而内自省也',
                    category: '修身论'
                },
                {
                    id: 'lunyu_7',
                    type: 'understanding',
                    question: '在《〈论语〉十二章》中，孔子认为做人要将心比心、推己及人，自己都不想做的，就不要希望别人也能做到的句子是：_______，_______',
                    answer: '己所不欲，勿施于人',
                    category: '修身论'
                }
            ]
        },
        '劝学': {
            id: '劝学',
            title: '劝学',
            author: '荀子',
            dynasty: '战国',
            questions: [
                {
                    id: 'quanxue_1',
                    type: 'contextual',
                    question: '《荀子·劝学》中举例论证借助外物的重要性时说，终日殚精竭虑思考，却"_______"，踮起脚极目远望，也"_______"。',
                    answer: '不如须臾之所学也，不如登高之博见也',
                    year: '2018',
                    exam: '全国III卷'
                },
                {
                    id: 'quanxue_2',
                    type: 'contextual',
                    question: '《荀子·劝学》中强调了积累的重要性，以"积土成山""积水成渊"可以"兴风雨""生蛟龙"设喻，引出"_______，_______，_______"的观点。',
                    answer: '积善成德，而神明自得，圣心备焉',
                    year: '2017',
                    exam: '全国III卷'
                },
                {
                    id: 'quanxue_3',
                    type: 'understanding',
                    question: '《劝学》开篇就提出了全文的中心论点"学不可以已"。此句阐明了学习要持之以恒，并在后来形成一个常用成语的句子是"_______，_______"。',
                    answer: '锲而不舍，金石可镂',
                    category: '名句精练'
                },
                {
                    id: 'quanxue_4',
                    type: 'contextual',
                    question: '《荀子·劝学》指出，蚯蚓虽然身体柔弱，却能"_______，_______"是用心专一的缘故。',
                    answer: '上食埃土，下饮黄泉',
                    year: '2016',
                    exam: '全国I卷'
                },
                {
                    id: 'quanxue_5',
                    type: 'understanding',
                    question: '荀子在《劝学》中强调君子的本性与一般人没什么不同，只是善于借助外力的句子是：_______，_______。',
                    answer: '君子生非异也，善假于物也',
                    category: '名句精练'
                },
                {
                    id: 'quanxue_6',
                    type: 'contextual',
                    question: '《劝学》中"_______，_______"两句，以马的执着为喻，强调为学必须持之以恒。',
                    answer: '骐骥一跃，不能十步；驽马十驾，功在不舍',
                    year: '2022',
                    exam: '新高考I卷'
                }
            ]
        },
        '屈原列传': {
            id: '屈原列传',
            title: '屈原列传(节选)',
            author: '司马迁',
            dynasty: '汉',
            questions: [
                {
                    id: 'quyuan_1',
                    type: 'understanding',
                    question: '在《屈原列传(节选)》中，司马迁认为《离骚》的创作背景除了楚怀王听信谗言、不能明辨是非以外，还有"_______，_______"，一针见血地指出了当时朝廷小人当道、正直之人遭到排挤的黑暗现实。',
                    answer: '邪曲之害公也，方正之不容也',
                    category: '名句精练'
                },
                {
                    id: 'quyuan_2',
                    type: 'understanding',
                    question: '在《屈原列传(节选)》中，作者司马迁对"离骚"一词作出自己的解释的句子是："离骚"者，______也。',
                    answer: '犹离忧',
                    category: '名句精练'
                },
                {
                    id: 'quyuan_3',
                    type: 'understanding',
                    question: '在《屈原列传(节选)》中，作者司马迁连用了"_______，_______"这两个被动句写出了屈原诚信待人却被猜疑、忠心耿耿却被诽谤的现实。',
                    answer: '信而见疑，忠而被谤',
                    category: '名句精练'
                },
                {
                    id: 'quyuan_4',
                    type: 'understanding',
                    question: '在《屈原列传(节选)》中，司马迁认为屈原的《离骚》虽然内容细小但含意却极宏大，所举的事例虽然浅近但意义却很深远的两句是：_______，_______。',
                    answer: '其称文小而其指极大，举类迩而见义远',
                    category: '名句精练'
                }
            ]
        },
        '谏太宗十思疏': {
            id: '谏太宗十思疏',
            title: '谏太宗十思疏',
            author: '魏征',
            dynasty: '唐',
            questions: [
                {
                    id: 'jianshu_1',
                    type: 'understanding',
                    question: '在《谏太宗十思疏》中魏征一开始便运用了排喻的手法，引出了中心论点"_______，_______"。',
                    answer: '思国之安者，必积其德义',
                    category: '名句精练'
                },
                {
                    id: 'jianshu_2',
                    type: 'understanding',
                    question: '《谏太宗十思疏》中"_______，_______"一句概括了历代君王能创业却不能守业的普遍规律。',
                    answer: '有善始者实繁，能克终者盖寡',
                    category: '名句精练'
                },
                {
                    id: 'jianshu_3',
                    type: 'understanding',
                    question: '《谏太宗十思疏》中运用对比句"_______，_______"写出了团结他人与轻视他人会造成不同的结果。',
                    answer: '竭诚则吴越为一体，傲物则骨肉为行路',
                    category: '名句精练'
                },
                {
                    id: 'jianshu_4',
                    type: 'understanding',
                    question: '《谏太宗十思疏》中，魏征用比喻说明人民力量巨大、劝谏唐太宗应深切警惕的两句是"_______，_______"。',
                    answer: '载舟覆舟，所宜深慎',
                    category: '名句精练'
                }
            ]
        },
        '师说': {
            id: '师说',
            title: '师说',
            author: '韩愈',
            dynasty: '唐',
            questions: [
                {
                    id: 'shishuo_1',
                    type: 'contextual',
                    question: '《师说》中，对于为子择师自己却耻于学习这种现象，韩愈最后的评价是："_______，_______"。',
                    answer: '小学而大遗，吾未见其明也',
                    year: '2019',
                    exam: '全国III卷'
                },
                {
                    id: 'shishuo_2',
                    type: 'understanding',
                    question: '《师说》中，韩愈认为老师的职能是"_______"。',
                    answer: '师者，所以传道受业解惑也',
                    category: '名句精练'
                },
                {
                    id: 'shishuo_3',
                    type: 'contextual',
                    question: '韩愈的《师说》是写给少年李蟠的。文末所说的"好古文"，点出李蟠的文章爱好，而"_______"，则说明了李蟠的儒学素养。',
                    answer: '六艺经传皆通习之',
                    year: '2018',
                    exam: '全国I卷'
                },
                {
                    id: 'shishuo_4',
                    type: 'understanding',
                    question: '《师说》中表明士大夫之族耻学于师的原因的语句是：_______，_______。',
                    answer: '位卑则足羞，官盛则近谀',
                    category: '名句精练'
                },
                {
                    id: 'shishuo_5',
                    type: 'understanding',
                    question: '韩愈在《师说》中通过"_______，_______"两句，表达了自己认为师生各有所长，可以相互学习的原因。',
                    answer: '闻道有先后，术业有专攻',
                    category: '名句精练'
                },
                {
                    id: 'shishuo_6',
                    type: 'contextual',
                    question: '荀子《劝学》中指出，"青，取之于蓝，而青于蓝。"这与韩愈《师说》中"_______，_______"的观点是相同的。',
                    answer: '是故弟子不必不如师，师不必贤于弟子',
                    year: '2020',
                    exam: '全国甲卷'
                }
            ]
        },
        '阿房宫赋': {
            id: '阿房宫赋',
            title: '阿房宫赋',
            author: '杜牧',
            dynasty: '唐',
            questions: [
                {
                    id: 'afang_1',
                    type: 'contextual',
                    question: '杜牧《阿房宫赋》中"_______，_______"两句，写阿房宫占地极广且极为高大，以表现其雄壮之美。',
                    answer: '覆压三百余里，隔离天日',
                    year: '2019',
                    exam: '全国II卷'
                },
                {
                    id: 'afang_2',
                    type: 'contextual',
                    question: '杜牧在《阿房宫赋》的结尾处感叹，如果六国爱护自己的百姓，就足以抵抗秦国。紧接着说"_______，_______？"',
                    answer: '使秦复爱六国之人，则递三世可至万世而为君，谁得而族灭也',
                    year: '2017',
                    exam: '全国I卷'
                },
                {
                    id: 'afang_3',
                    type: 'contextual',
                    question: '杜牧《阿房宫赋》中以"_______，_______"描写阿房宫宫人的美丽，她们伫立远眺，盼望着皇帝临幸。',
                    answer: '一肌一容，尽态极妍',
                    year: '2016',
                    exam: '全国II卷'
                },
                {
                    id: 'afang_4',
                    type: 'contextual',
                    question: '《阿房宫赋》中"_______，_______"两句描写宫殿、阁楼随地形而建，彼此环抱呼应；宫室结构参差错落，精巧工致。',
                    answer: '廊腰缦回，檐牙高啄；各抱地势，钩心斗角',
                    year: '2013',
                    exam: '全国新课标I卷'
                },
                {
                    id: 'afang_5',
                    type: 'understanding',
                    question: '不吸取历史的经验教训往往会让人痛惜。正如杜牧《阿房宫赋》中所说：_______，_______。',
                    answer: '后人哀之而不鉴之，亦使后人而复哀后人也',
                    category: '名句精练'
                },
                {
                    id: 'afang_6',
                    type: 'understanding',
                    question: '古人写文章言简意赅。杜牧在《阿房宫赋》中用"_______，_______，_______"三句话概括了三件历史大事。',
                    answer: '戍卒叫，函谷举，楚人一炬',
                    category: '名句精练'
                }
            ]
        },
        '六国论': {
            id: '六国论',
            title: '六国论',
            author: '苏洵',
            dynasty: '宋',
            questions: [
                {
                    id: 'liuguo_1',
                    type: 'understanding',
                    question: '苏洵在《六国论》中评论六国败亡的历史，提出"_______，_______，_______"的精辟论点。',
                    answer: '六国破灭，非兵不利、战不善，弊在赂秦',
                    category: '名句精练'
                },
                {
                    id: 'liuguo_2',
                    type: 'understanding',
                    question: '苏洵在《六国论》中引用古人的话，用比喻表明割地赂秦必然招致灭亡的句子是：_______，_______，_______，_______。',
                    answer: '以地事秦，犹抱薪救火，薪不尽，火不灭',
                    category: '名句精练'
                },
                {
                    id: 'liuguo_3',
                    type: 'understanding',
                    question: '《六国论》中苏洵认为"燕赵之君，始有远略"。其"有远略"的表现是："_______，_______"。',
                    answer: '能守其土，义不赂秦',
                    category: '名句精练'
                },
                {
                    id: 'liuguo_4',
                    type: 'understanding',
                    question: '《六国论》中苏洵借助"_______，_______"敏锐地指出了对抗秦国的办法，此举会让对方寝食难安。',
                    answer: '以赂秦之地封天下之谋臣，以事秦之心礼天下之奇才',
                    category: '名句精练'
                }
            ]
        },
        '答司马谏议书': {
            id: '答司马谏议书',
            title: '答司马谏议书',
            author: '王安石',
            dynasty: '宋',
            questions: [
                {
                    id: 'dasima_1',
                    type: 'understanding',
                    question: '在《答司马谏议书》中，王安石自言与司马光交情很好，但在政治上却常有不同意见及其原因的句子是：_______，_______。',
                    answer: '窃以为与君实游处相好之日久，而议事每不合，所操之术多异故也',
                    category: '名句精练'
                },
                {
                    id: 'dasima_2',
                    type: 'understanding',
                    question: '在《答司马谏议书》中，王安石对司马光在来信中给自己因推行变法而冠以"征利"罪名加以反驳的句子是：_______，_______。',
                    answer: '为天下理财，不为征利',
                    category: '名句精练'
                },
                {
                    id: 'dasima_3',
                    type: 'understanding',
                    question: '在《答司马谏议书》中，王安石用"_______，_______，_______"三句驳斥了司马光加给自己的"拒谏"罪名。',
                    answer: '辟邪说，难壬人，不为拒谏',
                    category: '名句精练'
                },
                {
                    id: 'dasima_4',
                    type: 'understanding',
                    question: '在《答司马谏议书》中"_______，_______，_______"表现出王安石坚持改革，不为流言俗语所动的决心。',
                    answer: '盘庚不为怨者故改其度，度义而后动，是而不见可悔故也',
                    category: '名句精练'
                }
            ]
        },
        '赤壁赋': {
            id: '赤壁赋',
            title: '赤壁赋',
            author: '苏轼',
            dynasty: '宋',
            questions: [
                {
                    id: 'chibi_1',
                    type: 'contextual',
                    question: '苏轼在《赤壁赋》中以"_______，_______"两句，写出了婉转悠长、延绵不尽的乐声之美。',
                    answer: '余音袅袅，不绝如缕',
                    year: '2019',
                    exam: '全国II卷'
                },
                {
                    id: 'chibi_2',
                    type: 'contextual',
                    question: '苏轼《赤壁赋》中描写明月初升的句子是"_______，_______"。',
                    answer: '月出于东山之上，徘徊于斗牛之间',
                    year: '2018',
                    exam: '全国II卷'
                },
                {
                    id: 'chibi_3',
                    type: 'contextual',
                    question: '在《赤壁赋》的开头，苏轼写自己与朋友泛舟赤壁之上，朗诵《诗经·陈风》中的《月出》篇，即文中所谓"_______，_______"。',
                    answer: '诵明月之诗，歌窈窕之章',
                    year: '2016',
                    exam: '全国III卷'
                },
                {
                    id: 'chibi_4',
                    type: 'understanding',
                    question: '《赤壁赋》中描绘秋江的爽朗和澄清，也恰好体现作者怡然自得的心境的句子是：_______，_______。',
                    answer: '清风徐来，水波不兴',
                    category: '名句精练'
                },
                {
                    id: 'chibi_5',
                    type: 'understanding',
                    question: '《赤壁赋》中友人慨叹"人生短促，人很渺小"的句子是：_______，_______。',
                    answer: '寄蜉蝣于天地，渺沧海之一粟',
                    category: '名句精练'
                },
                {
                    id: 'chibi_6',
                    type: 'understanding',
                    question: '《赤壁赋》中，面对自然风物，苏轼以"_______，_______"两句，表达了自己对江山无穷、风月长存，天地无私、声色共享的随缘自适的襟怀。',
                    answer: '是造物者之无尽藏也，而吾与子之所共适',
                    category: '名句精练'
                },
                {
                    id: 'chibi_7',
                    type: 'understanding',
                    question: '苏轼《赤壁赋》中"_______，_______"两句运用侧面描写突出洞箫声的悲伤凄凉。',
                    answer: '舞幽壑之潜蛟，泣孤舟之嫠妇',
                    category: '模拟试题'
                },
                {
                    id: 'chibi_8',
                    type: 'understanding',
                    question: '苏轼在《赤壁赋》中写江上清风，山间明月，能听到即为音乐，能看到即为美景，"_______，_______"，是自然界无穷无尽的宝藏，可以共享。',
                    answer: '取之无禁，用之不竭',
                    category: '模拟试题'
                }
            ]
        },
        '项脊轩志': {
            id: '项脊轩志',
            title: '项脊轩志',
            author: '归有光',
            dynasty: '明',
            questions: [
                {
                    id: 'xiangji_1',
                    type: 'understanding',
                    question: '在《项脊轩志》中描写了项脊轩的大小和面积的句子是：_______，_______。',
                    answer: '室仅方丈，可容一人居',
                    category: '名句精练'
                },
                {
                    id: 'xiangji_2',
                    type: 'understanding',
                    question: '在《项脊轩志》中，描写了项脊轩在修葺之前的老、旧、破的句子是：_______，_______，_______。',
                    answer: '百年老屋，尘泥渗漉，雨泽下注',
                    category: '名句精练'
                },
                {
                    id: 'xiangji_3',
                    type: 'understanding',
                    question: '在《项脊轩志》中，描写了在明月之夜，项脊轩附近桂树的影子落在半墙上，随着夜风的吹拂而不断移动的可爱景象的句子是：_______，_______，_______，_______。',
                    answer: '明月半墙，桂影斑驳，风移影动，珊珊可爱',
                    category: '名句精练'
                },
                {
                    id: 'xiangji_4',
                    type: 'understanding',
                    question: '在《项脊轩志》中，作者通过描写妻子当年亲手种植的枇杷树如今已长得枝繁叶茂来表达物是人非的感慨的句子是：_______，_______，_______。',
                    answer: '庭有枇杷树，吾妻死之年所手植也，今已亭亭如盖矣',
                    category: '名句精练'
                }
            ]
        },
        '子路曾皙冉有公西华侍坐': {
            id: '子路曾皙冉有公西华侍坐',
            title: '子路、曾皙、冉有、公西华侍坐',
            author: '孔子',
            dynasty: '春秋',
            questions: [
                {
                    id: 'shizuo_1',
                    type: 'contextual',
                    question: '《论语·先进》中写到孔子的四个弟子侍坐时各言其志，子路的志向是，用三年时间治理一个饱经忧患的千乘之国，"_______，_______"。',
                    answer: '可使有勇，且知方也',
                    year: '2020',
                    exam: '新高考全国I卷(山东卷)'
                },
                {
                    id: 'shizuo_2',
                    type: 'understanding',
                    question: '文中面对孔子的提问，个性鲁莽却率真的子路急忙回答道："千乘之国，摄乎大国之间，加之以师旅，因之以饥馑；由也为之，_______，_______，_______。"',
                    answer: '比及三年，可使有勇，且知方也',
                    category: '名句精练'
                },
                {
                    id: 'shizuo_3',
                    type: 'understanding',
                    question: '文中面对孔子的询问，曾晳描绘了一幅在大自然里沐浴着风，一路酣歌的美丽动人的景象的语句是：_______，_______，_______。',
                    answer: '浴乎沂，风乎舞雩，咏而归',
                    category: '名句精练'
                },
                {
                    id: 'shizuo_4',
                    type: 'understanding',
                    question: '文中孔子最赞同曾晳的回答，从"夫子喟然叹曰：\'_______！\'"句可以看出。',
                    answer: '吾与点也',
                    category: '名句精练'
                }
            ]
        },
        '报任安书': {
            id: '报任安书',
            title: '报任安书(节选)',
            author: '司马迁',
            dynasty: '汉',
            questions: [
                {
                    id: 'baoren_1',
                    type: 'understanding',
                    question: '《报任安书(节选)》中，太史公叙述了自己写作《史记》的目的是"_______，_______，_______"。',
                    answer: '亦欲以究天人之际，通古今之变，成一家之言',
                    category: '名句精练'
                },
                {
                    id: 'baoren_2',
                    type: 'understanding',
                    question: '《报任安书(节选)》中司马迁以左丘无明、孙子为例，说古代圣贤著书的目的是：_______，_______。',
                    answer: '以舒其愤，思垂空文以自见',
                    category: '名句精练'
                }
            ]
        },
        '过秦论': {
            id: '过秦论',
            title: '过秦论',
            author: '贾谊',
            dynasty: '汉',
            questions: [
                {
                    id: 'guoqin_1',
                    type: 'understanding',
                    question: '《过秦论》中叙述了商鞅对秦国国内实行变法，以图强盛的措施的句子是：_______，_______，_______。',
                    answer: '内立法度，务耕织，修守战之具',
                    category: '名句精练'
                },
                {
                    id: 'guoqin_2',
                    type: 'understanding',
                    question: '《过秦论》中"_______，_______，_______"三句最能表现秦始皇用武力一统天下、势不可挡。',
                    answer: '振长策而御宇内，吞二周而亡诸侯，履至尊而制六合',
                    category: '名句精练'
                },
                {
                    id: 'guoqin_3',
                    type: 'understanding',
                    question: '《过秦论》中"_______，_______"两运用比喻形象生动的写出陈涉起义后得到热烈响应，最终豪杰并起，秦朝覆亡。',
                    answer: '天下云集响应，赢粮而景从',
                    category: '名句精练'
                },
                {
                    id: 'guoqin_4',
                    type: 'understanding',
                    question: '庞大的秦帝国迅速土崩瓦解，引发了无数文人墨客的思考。贾谊在《过秦论》中，用"_______"一句尖锐地指出其灭亡的根本原因。',
                    answer: '仁义不施而攻守之势异也',
                    category: '名句精练'
                }
            ]
        },
        '礼运': {
            id: '礼运',
            title: '礼运',
            author: '《礼记》',
            dynasty: '汉',
            questions: [
                {
                    id: 'liyun_1',
                    type: 'understanding',
                    question: '《礼记·礼运》通过"_______，_______"两句，描写了历史长河中，在往圣先贤的理想憧憬里，还有一个他们从未抵达的理想家园。',
                    answer: '大道之行也，天下为公',
                    category: '名句精练'
                },
                {
                    id: 'liyun_2',
                    type: 'understanding',
                    question: '《礼记·礼运》中体现了人才得到重用，社会成员间和睦相处的句子是"_______，_______"。',
                    answer: '选贤与能，讲信修睦',
                    category: '名句精练'
                },
                {
                    id: 'liyun_3',
                    type: 'understanding',
                    question: '《礼记·礼运》中与"老吾老，以及人之老；幼吾幼，以及人之幼"表意相近的句子是"_______，_______"。',
                    answer: '故人不独亲其亲，不独子其子',
                    category: '名句精练'
                }
            ]
        },
        '陈情表': {
            id: '陈情表',
            title: '陈情表',
            author: '李密',
            dynasty: '晋',
            questions: [
                {
                    id: 'chenqing_1',
                    type: 'understanding',
                    question: '《陈情表》中，李密以自己从小生活不幸总领全文的句子是：_______，_______。',
                    answer: '臣以险衅，夙遭闵凶',
                    category: '名句精练'
                },
                {
                    id: 'chenqing_2',
                    type: 'understanding',
                    question: '《陈情表》中，作者李密通过"_______，_______。_______，_______"四句，形象了刻画自己幼年寂寞、孤独惨境。',
                    answer: '外无期功强近之亲，内无应门五尺之僮。茕茕孑立，形影相吊',
                    category: '名句精练'
                },
                {
                    id: 'chenqing_3',
                    type: 'understanding',
                    question: '《陈情表》中用比喻手法写祖母刘氏年老病危的句子是：_______，_______，_______，_______。',
                    answer: '但以刘日薄西山，气息奄奄，人命危浅，朝不虑夕',
                    category: '名句精练'
                },
                {
                    id: 'chenqing_4',
                    type: 'understanding',
                    question: '《陈情表》中以乌鸦反哺为喻，来揭示全文主旨的句子是：_______，_______。',
                    answer: '乌鸟私情，愿乞终养',
                    category: '名句精练'
                }
            ]
        },
        '归去来兮辞': {
            id: '归去来兮辞',
            title: '归去来兮辞(并序)',
            author: '陶潜',
            dynasty: '晋',
            questions: [
                {
                    id: 'guiqulai_1',
                    type: 'understanding',
                    question: '《归去来兮辞(并序)》中"_______，_______"表达出对田园生活的向往。',
                    answer: '归去来兮，田园将芜胡不归',
                    category: '名句精练'
                },
                {
                    id: 'guiqulai_2',
                    type: 'understanding',
                    question: '我们经常用陶渊明《归去来兮辞(并序)》中的"_______，_______"来表达过去不可挽回，未来则可把握。',
                    answer: '悟已往之不谏，知来者之可追',
                    category: '名句精练'
                },
                {
                    id: 'guiqulai_3',
                    type: 'understanding',
                    question: '《归去来兮辞(并序)》中"_______，_______"两句以云鸟自喻，表现诗人过去做官出自无心，如今归田恰如鸟倦飞而知还。',
                    answer: '云无心以出岫，鸟倦飞而知还',
                    category: '名句精练'
                },
                {
                    id: 'guiqulai_4',
                    type: 'understanding',
                    question: '《归去来兮辞(并序)》中"_______，_______"两句写菊前松下才是他孤洁灵魂的栖所。',
                    answer: '三径就荒，松菊犹存',
                    category: '名句精练'
                }
            ]
        },
        '种树郭橐驼传': {
            id: '种树郭橐驼传',
            title: '种树郭橐驼传',
            author: '柳宗元',
            dynasty: '唐',
            questions: [
                {
                    id: 'zhongshu_1',
                    type: 'understanding',
                    question: '《种树郭橐驼传》中，柳宗元通过"_______，_______，_______，_______"四句概括了树木的本性，也揭示了种树的要领。',
                    answer: '其本欲舒，其培欲平，其土欲故，其筑欲密',
                    category: '名句精练'
                },
                {
                    id: 'zhongshu_2',
                    type: 'understanding',
                    question: '《种树郭橐驼传》中，用"_______，_______；_______，_______"表明一般种树的人不是撒手不管而是关心太过，什么都放不下，结果适得其反。',
                    answer: '虽曰爱之，其实害之；虽曰忧之，其实仇之',
                    category: '名句精练'
                },
                {
                    id: 'zhongshu_3',
                    type: 'understanding',
                    question: '《种树郭橐驼传》最后一句"_______"直接点出写作本文的真正意图。',
                    answer: '传其事以为官戒也',
                    category: '名句精练'
                }
            ]
        },
        '五代史伶官传序': {
            id: '五代史伶官传序',
            title: '五代史伶官传序',
            author: '欧阳修',
            dynasty: '宋',
            questions: [
                {
                    id: 'lingguan_1',
                    type: 'understanding',
                    question: '《五代史伶官传序》中，作者欧阳修开篇即点明了本文的中心论点是：_______，_______，_______？',
                    answer: '盛衰之理，虽曰天命，岂非人事哉',
                    category: '名句精练'
                },
                {
                    id: 'lingguan_2',
                    type: 'understanding',
                    question: '《五代史伶官传序》中，欧阳修引用《尚书》中的"_______，_______"两句，结合庄宗得失天下的史实，得出"忧劳可以兴国，逸豫可以亡身"的结论。',
                    answer: '满招损，谦得益',
                    category: '名句精练'
                }
            ]
        },
        '石钟山记': {
            id: '石钟山记',
            title: '石钟山记',
            author: '苏轼',
            dynasty: '宋',
            questions: [
                {
                    id: 'shizhong_1',
                    type: 'understanding',
                    question: '在《石钟山记》中作者用一个宾语前置句来表达自己知道石钟山得名的原因后轻松愉快的心情的是"_______"。',
                    answer: '古之人不余欺也',
                    category: '名句精练'
                },
                {
                    id: 'shizhong_2',
                    type: 'understanding',
                    question: '在《石钟山记》中，苏轼用"_______，_______？"这一反诘句提出全文中心。',
                    answer: '事不目见耳闻，而臆断其有无，可乎',
                    category: '名句精练'
                }
            ]
        },
        '登泰山记': {
            id: '登泰山记',
            title: '登泰山记',
            author: '姚鼐',
            dynasty: '清',
            questions: [
                {
                    id: 'dengtai_1',
                    type: 'understanding',
                    question: '《登泰山记》中"_______，_______"两句，作者不言雪覆盖青山，却说青山背负着雪，进而说苍山上的雪像蜡烛一样照着天南。',
                    answer: '苍山负雪，明烛天南',
                    category: '名句精练'
                },
                {
                    id: 'dengtai_2',
                    type: 'understanding',
                    question: '《登泰山记》中太阳将出时的景色是"_______，_______"。在天地相接的地方，有一线云层，显现出奇异的颜色，霎时间呈现出五彩缤纷的样子。',
                    answer: '极天云一线异色，须臾成五采',
                    category: '名句精练'
                }
            ]
        },
        // 诗词部分开始
        '静女': {
            id: '静女',
            title: '静女',
            author: '《诗经·邶风》',
            dynasty: '先秦',
            questions: [
                {
                    id: 'jingnu_1',
                    type: 'understanding',
                    question: '《静女》中，描写小伙子焦急等待的句子是：_______，_______。',
                    answer: '爱而不见，搔首踟蹰',
                    category: '名句精练'
                },
                {
                    id: 'jingnu_2',
                    type: 'understanding',
                    question: '《静女》中，写到包含姑娘亲情蜜意，爱屋及乌的句子是：_______，_______。',
                    answer: '匪女之为美，美人之贻',
                    category: '名句精练'
                }
            ]
        },
        '无衣': {
            id: '无衣',
            title: '无衣',
            author: '《诗经·秦风》',
            dynasty: '先秦',
            questions: [
                {
                    id: 'wuyi_1',
                    type: 'contextual',
                    question: '后世多将军队中的同事称为"袍泽"，这个词源自《诗经·秦风·无衣》中"_______"和"_______"两句。',
                    answer: '与子同袍，与子同泽',
                    year: '2020',
                    exam: '新高考全国II卷(海南卷)'
                },
                {
                    id: 'wuyi_2',
                    type: 'understanding',
                    question: '《无衣》中表现战士们同仇敌忾、步调一致、奋起作战的句子有三种。表达了"我同你一样仇恨敌人"的句子是：______；表达了"我同你一起行动起来"的句子是：______；表达了"我同你一起上战场"的句子是：______。',
                    answer: '与子同仇，与子偕作，与子偕行',
                    category: '名句精练'
                }
            ]
        },
        '离骚': {
            id: '离骚',
            title: '离骚(节选)',
            author: '屈原',
            dynasty: '战国',
            questions: [
                {
                    id: 'lisao_1',
                    type: 'contextual',
                    question: '《离骚》中"_______，_______"两句出现在江苏卷的默写题中。',
                    answer: '扈江离与辟芷兮，纫秋兰以为佩',
                    year: '2020',
                    exam: '江苏卷'
                },
                {
                    id: 'lisao_2',
                    type: 'understanding',
                    question: '在《离骚(节选)》中，屈原表明自己出身高贵的句子的是：_______，_______。',
                    answer: '帝高阳之苗裔兮，朕皇考曰伯庸',
                    category: '名句精练'
                },
                {
                    id: 'lisao_3',
                    type: 'understanding',
                    question: '在《离骚(节选)》中，屈原表明自己具有美好内在品质和才能的句子是"_______，_______"，这也强调自己才能修养不同于一般人。',
                    answer: '纷吾既有此内美兮，又重之以修能',
                    category: '名句精练'
                },
                {
                    id: 'lisao_4',
                    type: 'understanding',
                    question: '在《离骚(节选)》中，屈原看到时光易逝，担心国君易老、昏庸误国、保守落后的句子是：_______，_______。',
                    answer: '惟草木之零落兮，恐美人之迟暮',
                    category: '名句精练'
                }
            ]
        },
        '涉江采芙蓉': {
            id: '涉江采芙蓉',
            title: '涉江采芙蓉',
            author: '《古诗十九首》',
            dynasty: '汉',
            questions: [
                {
                    id: 'shejiang_1',
                    type: 'understanding',
                    question: '《涉江采芙蓉》中运用比兴手法写抒情主人公形象的雅洁及营造清幽、高洁的意境的句子是："_______，_______。"',
                    answer: '涉江采芙蓉，兰泽多芳草',
                    category: '名句精练'
                },
                {
                    id: 'shejiang_2',
                    type: 'understanding',
                    question: '《涉江采芙蓉》中写两个相思相爱的人不能相聚相守的句子是："_______，_______。"',
                    answer: '同心而离居，忧伤以终老',
                    category: '名句精练'
                }
            ]
        },
        '短歌行': {
            id: '短歌行',
            title: '短歌行',
            author: '曹操',
            dynasty: '三国',
            questions: [
                {
                    id: 'duange_1',
                    type: 'contextual',
                    question: '天津卷中出现"_______，_______。_______，_______。"这四句来自曹操《短歌行》。',
                    answer: '山不厌高，海不厌深。周公吐哺，天下归心',
                    year: '2020',
                    exam: '天津卷'
                },
                {
                    id: 'duange_2',
                    type: 'understanding',
                    question: '《短歌行》中比喻人生短促的句子：_______，_______。',
                    answer: '譬如朝露，去日苦多',
                    category: '名句精练'
                },
                {
                    id: 'duange_3',
                    type: 'understanding',
                    question: '《短歌行》中作者曹操借用典故，表示自己像周公一样热切殷勤地接待贤才，使天下人才都心悦诚服地归顺的句子："_______，_______。"',
                    answer: '周公吐哺，天下归心',
                    category: '名句精练'
                }
            ]
        },
        '归园田居': {
            id: '归园田居',
            title: '归园田居(其一)',
            author: '陶潜',
            dynasty: '晋',
            questions: [
                {
                    id: 'guiyuan_1',
                    type: 'understanding',
                    question: '《归园田居(其一)》中写诗人真诚的自我表白的句子：_______，_______。',
                    answer: '少无适俗韵，性本爱丘山',
                    category: '名句精练'
                },
                {
                    id: 'guiyuan_2',
                    type: 'understanding',
                    question: '《归园田居(其一)》中"_______，_______"两句，运用拟人手法写诗人身在宦海而心系田园的心情。',
                    answer: '羁鸟恋旧林，池鱼思故渊',
                    category: '名句精练'
                },
                {
                    id: 'guiyuan_3',
                    type: 'understanding',
                    question: '《归园田居(其一)》中"_______，_______"写出了诗人回归田园的愉悦之情。',
                    answer: '久在樊笼里，复得返自然',
                    category: '名句精练'
                },
                {
                    id: 'guiyuan_4',
                    type: 'contextual',
                    question: '陶渊明《归园田居》中"_______，_______"两句，采用对偶句式，连用两个比喻，表达诗人对官场的厌倦以及对田园的向往。',
                    answer: '羁鸟恋旧林，池鱼思故渊',
                    year: '2021',
                    exam: '新高考I卷'
                }
            ]
        },
        '春江花月夜': {
            id: '春江花月夜',
            title: '春江花月夜',
            author: '张若虚',
            dynasty: '唐',
            questions: [
                {
                    id: 'chunjiang_1',
                    type: 'contextual',
                    question: '浙江卷中出现了《春江花月夜》的名句："_______，_______。_______，_______。"',
                    answer: '可怜楼上月徘徊，应照离人妆镜台。玉户帘中卷不去，捣衣砧上拂还来',
                    year: '2020',
                    exam: '浙江卷'
                },
                {
                    id: 'chunjiang_2',
                    type: 'understanding',
                    question: '张若虚的《春江花月夜》融写景、抒情和哲理于一体：写春江花月之夜景，抒思乡孤独之情，其中"_______，_______"则渗透了人事变幻、江月永恒的哲理。',
                    answer: '人生代代无穷已，江月年年望相似',
                    category: '名句精练'
                }
            ]
        },
        '山居秋暝': {
            id: '山居秋暝',
            title: '山居秋暝',
            author: '王维',
            dynasty: '唐',
            questions: [
                {
                    id: 'shanju_1',
                    type: 'understanding',
                    question: '古代文人善于借"秋"表情达意，如：王维《山居秋暝》中的"_______，_______"。',
                    answer: '空山新雨后，天气晚来秋',
                    category: '名句精练'
                },
                {
                    id: 'shanju_2',
                    type: 'understanding',
                    question: '王维《山居秋暝》中以动写静，以有声衬无声来突出山的幽静环境的句子是：_______，_______。',
                    answer: '明月松间照，清泉石上流',
                    category: '名句精练'
                },
                {
                    id: 'shanju_3',
                    type: 'understanding',
                    question: '王维《山居秋暝》中含蓄地表达诗人远离官场、洁身自好、归隐山林的生活志向的诗句是：_______，_______。',
                    answer: '随意春芳歇，王孙自可留',
                    category: '名句精练'
                }
            ]
        },
        '蜀道难': {
            id: '蜀道难',
            title: '蜀道难',
            author: '李白',
            dynasty: '唐',
            questions: [
                {
                    id: 'shudao_1',
                    type: 'contextual',
                    question: '李白《蜀道难》中"_______，_______"两句，回顾了"五丁开山"的传说。',
                    answer: '地崩山摧壮士死，然后天梯石栈相钩连',
                    year: '2019',
                    exam: '全国I卷'
                },
                {
                    id: 'shudao_2',
                    type: 'contextual',
                    question: '江苏卷中出现了《蜀道难》的名句："_______，_______，_______。"',
                    answer: '剑阁峥嵘而崔嵬，一夫当关，万夫莫开',
                    year: '2020',
                    exam: '江苏卷'
                },
                {
                    id: 'shudao_3',
                    type: 'understanding',
                    question: '《蜀道难》中李白的"_______，_______"的长叹中，我们似乎也感受到了诗人对功业难成的一声叹息。',
                    answer: '蜀道之难，难于上青天',
                    category: '名句精练'
                }
            ]
        },
        '将进酒': {
            id: '将进酒',
            title: '将进酒',
            author: '李白',
            dynasty: '唐',
            questions: [
                {
                    id: 'jiangjin_1',
                    type: 'understanding',
                    question: '《将进酒》中用比兴手法显示黄河的宏伟气魄和浩大声势的诗句是：_______，_______。',
                    answer: '君不见黄河之水天上来，奔流到海不复回',
                    category: '名句精练'
                },
                {
                    id: 'jiangjin_2',
                    type: 'understanding',
                    question: '《将进酒》中显示诗人对未来充满信心的诗句是：_______，_______。',
                    answer: '天生我材必有用，千金散尽还复来',
                    category: '名句精练'
                },
                {
                    id: 'jiangjin_3',
                    type: 'understanding',
                    question: '《将进酒》中抒写万古寂寞之愁的诗句是：_______，_______。',
                    answer: '古来圣贤皆寂寞，惟有饮者留其名',
                    category: '名句精练'
                }
            ]
        },
        '蜀相': {
            id: '蜀相',
            title: '蜀相',
            author: '杜甫',
            dynasty: '唐',
            questions: [
                {
                    id: 'shuxiang_1',
                    type: 'contextual',
                    question: '天津卷中出现了杜甫《蜀相》的名句："_______，_______。"',
                    answer: '三顾频烦天下计，两朝开济老臣心',
                    year: '2020',
                    exam: '天津卷'
                },
                {
                    id: 'shuxiang_2',
                    type: 'understanding',
                    question: '杜甫《蜀相》中"_______，_______"两句，写对诸葛武侯的悼念。以诸葛之伟才，本可以一统河山。无奈天不从人愿，正当盛年病逝五丈原，让人痛惜。',
                    answer: '出师未捷身先死，长使英雄泪满襟',
                    category: '名句精练'
                }
            ]
        },
        '登岳阳楼': {
            id: '登岳阳楼',
            title: '登岳阳楼',
            author: '杜甫',
            dynasty: '唐',
            questions: [
                {
                    id: 'dengyueyang_1',
                    type: 'understanding',
                    question: '杜甫《登岳阳楼》中借"昔""今"二字展开思路，拉开时间的帷幕，为全诗浩大的气势奠定基础的诗句是：_______，_______。',
                    answer: '昔闻洞庭水，今上岳阳楼',
                    category: '名句精练'
                },
                {
                    id: 'dengyueyang_2',
                    type: 'understanding',
                    question: '《登岳阳楼》中"_______，_______"两句，写洞庭湖浩瀚无际的磅礴气势，意境阔大，景色宏伟奇丽。',
                    answer: '吴楚东南坼，乾坤日夜浮',
                    category: '名句精练'
                },
                {
                    id: 'dengyueyang_3',
                    type: 'understanding',
                    question: '《登岳阳楼》中"_______，_______"两句，写诗人年老多病，远离亲友，以舟为家，流落在外，表现了诗人的凄凉之境、哀痛之心、愤怨之情。',
                    answer: '亲朋无一字，老病有孤舟',
                    category: '名句精练'
                },
                {
                    id: 'dengyueyang_4',
                    type: 'understanding',
                    question: '《登岳阳楼》中"_______，_______"两句，写诗人站在岳阳楼上，遥望关山以北，仍然是兵荒马乱、战火纷飞；凭倚窗轩，胸怀家国，不禁涕泪交流。',
                    answer: '戎马关山北，凭轩涕泗流',
                    category: '名句精练'
                },
                {
                    id: 'dengyueyang_5',
                    type: 'contextual',
                    question: '杜甫《登岳阳楼》中"_______，_______"两句，描画了洞庭湖水势浩瀚、无边无际的景象。',
                    answer: '吴楚东南坼，乾坤日夜浮',
                    year: '2020',
                    exam: '新高考II卷'
                }
            ]
        },
        '登高': {
            id: '登高',
            title: '登高',
            author: '杜甫',
            dynasty: '唐',
            questions: [
                {
                    id: 'denggao_1',
                    type: 'understanding',
                    question: '杜甫《登高》中"_______，_______"两句，不仅使人联想到落木窸窣之声，长江汹涌之状，也无形中传达出韶光易逝、壮志难酬的感伤。前人把它誉为"古今独步"的"句中化境"。',
                    answer: '无边落木萧萧下，不尽长江滚滚来',
                    category: '名句精练'
                },
                {
                    id: 'denggao_2',
                    type: 'understanding',
                    question: '《登高》中，作者杜甫用"_______，_______"两句，从空间、时间两方面着笔，把久客最易悲秋的复杂感情融入诗句中。',
                    answer: '万里悲秋常作客，百年多病独登台',
                    category: '名句精练'
                },
                {
                    id: 'denggao_3',
                    type: 'contextual',
                    question: '杜甫《登高》中"_______，_______"两句都使用了叠字，从听觉、视觉上突出了对景伤怀的感受。',
                    answer: '风急天高猿啸哀，渚清沙白鸟飞回',
                    year: '2022',
                    exam: '全国甲卷'
                }
            ]
        },
        '琵琶行': {
            id: '琵琶行',
            title: '琵琶行(并序)',
            author: '白居易',
            dynasty: '唐',
            questions: [
                {
                    id: 'pipa_1',
                    type: 'contextual',
                    question: '白居易的《琵琶行》中"_______，_______"两句写昔日的琵琶女身价很高，引来了众多纨绔子弟的追捧。',
                    answer: '五陵年少争缠头，一曲红绡不知数',
                    year: '2018',
                    exam: '全国II卷'
                },
                {
                    id: 'pipa_2',
                    type: 'contextual',
                    question: '元代戏剧家马致远的杂剧《青衫泪》根据白居易的诗《琵琶行》改编而成其，剧名来自白诗中的"_______，_______"两句。',
                    answer: '座中泣下谁最多，江州司马青衫湿',
                    year: '2020',
                    exam: '全国I卷'
                },
                {
                    id: 'pipa_3',
                    type: 'understanding',
                    question: '《琵琶行并序》中，"_______，_______"是全诗的主旨句，表明诗人与琵琶女同病相怜。',
                    answer: '同是天涯沦落人，相逢何必曾相识',
                    category: '名句精练'
                }
            ]
        },
        '锦瑟': {
            id: '锦瑟',
            title: '锦瑟',
            author: '李商隐',
            dynasty: '唐',
            questions: [
                {
                    id: 'jinse_1',
                    type: 'understanding',
                    question: '《锦瑟》中以锦瑟起兴，引起对华年往事的追忆的句子是：_______，_______。',
                    answer: '锦瑟无端五十弦，一弦一柱思华年',
                    category: '名句精练'
                },
                {
                    id: 'jinse_2',
                    type: 'understanding',
                    question: '往事不堪回首，纵回首也已是惘然，李商隐在《锦瑟》中表达这种感受的两句是：_______？_______。',
                    answer: '此情可待成追忆？只是当时已惘然',
                    category: '名句精练'
                },
                {
                    id: 'jinse_3',
                    type: 'contextual',
                    question: '李商隐《锦瑟》"_______，_______"两句中的数目字，引发了后世读者的多种解读。',
                    answer: '锦瑟无端五十弦，一弦一柱思华年',
                    year: '2022',
                    exam: '全国乙卷'
                }
            ]
        },
        '虞美人': {
            id: '虞美人',
            title: '虞美人',
            author: '李煜',
            dynasty: '五代',
            questions: [
                {
                    id: 'yumei_1',
                    type: 'understanding',
                    question: '李煜《虞美人》中"_______，_______"两句写词人夜晚在春风里、月光下深切怀念故国的情景，伤悲之情溢于言表。',
                    answer: '小楼昨夜又东风，故国不堪回首月明中',
                    category: '名句精练'
                },
                {
                    id: 'yumei_2',
                    type: 'understanding',
                    question: '李煜《虞美人》中用比喻、夸张、设问手法写出愁思之深的句子是：_______？_______。',
                    answer: '问君能有几多愁？恰似一江春水向东流',
                    category: '名句精练'
                }
            ]
        },
        '念奴娇赤壁怀古': {
            id: '念奴娇赤壁怀古',
            title: '念奴娇·赤壁怀古',
            author: '苏轼',
            dynasty: '宋',
            questions: [
                {
                    id: 'niannujiao_1',
                    type: 'understanding',
                    question: '《念奴娇·赤壁怀古》中，词人从视觉、听觉角度，同时运用比喻生动描写赤壁雄奇、险要、壮阔形势的语句是：_______，_______，_______。',
                    answer: '乱石穿空，惊涛拍岸，卷起千堆雪',
                    category: '名句精练'
                },
                {
                    id: 'niannujiao_2',
                    type: 'understanding',
                    question: '《念奴娇·赤壁怀古》中表达词人旷达之情的句子是：_______，_______。',
                    answer: '人生如梦，一尊还酹江月',
                    category: '名句精练'
                },
                {
                    id: 'niannujiao_3',
                    type: 'understanding',
                    question: '《念奴娇·赤壁怀古》中，表现周瑜从容娴雅，沉着应战，指挥若定的儒将风度形象的词句是：_______，_______，_______。',
                    answer: '羽扇纶巾，谈笑间，樯橹灰飞烟灭',
                    category: '名句精练'
                }
            ]
        },
        '鹊桥仙': {
            id: '鹊桥仙',
            title: '鹊桥仙',
            author: '秦观',
            dynasty: '宋',
            questions: [
                {
                    id: 'queqiao_1',
                    type: 'understanding',
                    question: '秦观《鹊桥仙》中"_______，_______"两句表明了爱情天长地久，不在一朝一夕。',
                    answer: '两情若是久长时，又岂在朝朝暮暮',
                    category: '名句精练'
                },
                {
                    id: 'queqiao_2',
                    type: 'understanding',
                    question: '秦观《鹊桥仙》里赞叹牛郎织女一年一度的七夕相会胜似人间长相厮守的美好，正是：_______，_______。',
                    answer: '金风玉露一相逢，便胜却人间无数',
                    category: '名句精练'
                }
            ]
        },
        '声声慢': {
            id: '声声慢',
            title: '声声慢',
            author: '李清照',
            dynasty: '宋',
            questions: [
                {
                    id: 'shengsheng_1',
                    type: 'understanding',
                    question: '李清照《声声慢》中"_______，_______，_______"三句，用一连串叠字写主人公一整天的愁苦心情，为全词定下了一种愁惨而凄厉的基调。',
                    answer: '寻寻觅觅，冷冷清清，凄凄惨惨戚戚',
                    category: '名句精练'
                },
                {
                    id: 'shengsheng_2',
                    type: 'understanding',
                    question: '李清照《声声慢》中写道：酒气挡不住晚风，更遣不散心头的寒意。用"_______，_______？"两句形容再恰当不过。',
                    answer: '三杯两盏淡酒，怎敌他、晚来风急',
                    category: '名句精练'
                }
            ]
        },
        '永遇乐京口北固亭怀古': {
            id: '永遇乐京口北固亭怀古',
            title: '永遇乐·京口北固亭怀古',
            author: '辛弃疾',
            dynasty: '宋',
            questions: [
                {
                    id: 'yongyule_1',
                    type: 'understanding',
                    question: '《永遇乐·京口北固亭怀古》中，作者登高望远，首先想到孙权这位著名的历史人物，不禁感叹：_______，_______。',
                    answer: '千古江山，英雄无觅孙仲谋处',
                    category: '名句精练'
                },
                {
                    id: 'yongyule_2',
                    type: 'understanding',
                    question: '《永遇乐·京口北固亭怀古》中，辛弃疾"_______：_______，_______？"三句借用廉颇的典故，表明自己年纪虽老而壮志犹存，感叹自己被弃置不用的苦痛。',
                    answer: '凭谁问：廉颇老矣，尚能饭否',
                    category: '名句精练'
                },
                {
                    id: 'yongyule_3',
                    type: 'contextual',
                    question: '辛弃疾《永遇乐·京口北固亭怀古》中"_______，_______"两句，表现了当年刘裕率军北伐时的强大气势。',
                    answer: '想当年，金戈铁马，气吞万里如虎',
                    year: '2022',
                    exam: '全国甲卷'
                },
                {
                    id: 'yongyule_4',
                    type: 'understanding',
                    question: '《永遇乐·京口北固亭怀古》中，辛弃疾感慨治下区域人民安于异族的统治，竟至于对异族统治者礼崇拜的诗句是"_______，_______，_______"。',
                    answer: '可堪回首，佛狸祠下，一片神鸦社鼓',
                    category: '模拟试题'
                }
            ]
        },
        '菩萨蛮书江西造口壁': {
            id: '菩萨蛮书江西造口壁',
            title: '菩萨蛮·书江西造口壁',
            author: '辛弃疾',
            dynasty: '宋',
            questions: [
                {
                    id: 'pusa_1',
                    type: 'contextual',
                    question: '辛弃疾《菩萨蛮（郁孤台下清江水）》中写道，江中不仅能看到江水，还能看到"_______"；而北望故都，又"_______"，视线常被遮断。',
                    answer: '中间多少行人泪，可怜无数山',
                    year: '2020',
                    exam: '新高考全国I卷(山东卷)'
                },
                {
                    id: 'pusa_2',
                    type: 'understanding',
                    question: '《菩萨蛮·书江西造口壁》中"_______，_______"表明了宋朝军民收复失地坚定决心。',
                    answer: '青山遮不住，毕竟东流去',
                    category: '名句精练'
                }
            ]
        },
        '青玉案元夕': {
            id: '青玉案元夕',
            title: '青玉案·元夕',
            author: '辛弃疾',
            dynasty: '宋',
            questions: [
                {
                    id: 'qingyu_1',
                    type: 'understanding',
                    question: '王国维在《人间词话》中说：古今之成大事业、大学问者，必经过三种之境界，而第三境，则取自于辛弃疾的《青玉案·元夕》，即"_______，_______，_______"。',
                    answer: '蓦然回首，那人却在，灯火阑珊处',
                    category: '名句精练'
                }
            ]
        },
        '扬州慢': {
            id: '扬州慢',
            title: '扬州慢',
            author: '姜夔',
            dynasty: '宋',
            questions: [
                {
                    id: 'yangzhou_1',
                    type: 'understanding',
                    question: '好的诗文往往表现在情景交融上。姜夔在《扬州慢》用"_______，_______"这一景物描写，写出了"胡马窥江去后"的萧条与冷落。',
                    answer: '过春风十里，尽荠麦青青',
                    category: '名句精练'
                },
                {
                    id: 'yangzhou_2',
                    type: 'understanding',
                    question: '杜牧诗云"二十四桥明月夜，玉人何处教吹箫"，写出了扬州歌舞升平的景象；姜夔在《扬州慢》中说"_______，_______，_______"，写出了一派冷清沉寂的景象。',
                    answer: '二十四桥仍在，波心荡，冷月无声',
                    category: '名句精练'
                }
            ]
        },
        '长亭送别': {
            id: '长亭送别',
            title: '长亭送别(节选)',
            author: '王实甫',
            dynasty: '元',
            questions: [
                {
                    id: 'changting_1',
                    type: 'understanding',
                    question: '《西厢记·长亭送别》中写伊人即将远别，不禁为之黯然垂泪的句子是：_______？_______。',
                    answer: '晓来谁染霜林醉？总是离人泪',
                    category: '名句精练'
                }
            ]
        },
        '朝天子咏喇叭': {
            id: '朝天子咏喇叭',
            title: '朝天子·咏喇叭',
            author: '王磐',
            dynasty: '元',
            questions: [
                {
                    id: 'chaotian_1',
                    type: 'understanding',
                    question: '《朝天子·咏喇叭》写出喇叭"吹"之声音的句子是：_______，_______，_______。',
                    answer: '喇叭，唢呐，曲儿小腔儿大',
                    category: '名句精练'
                },
                {
                    id: 'chaotian_2',
                    type: 'understanding',
                    question: '《朝天子·咏喇叭》形象地写出宦官欺压百姓，把百姓搜刮得倾家荡产的句子是：_______，_______，_______！',
                    answer: '眼见的吹翻了这家，吹伤了那家，只吹的水尽鹅飞罢',
                    category: '名句精练'
                }
            ]
        },
        // 新增文章
        '关雎': {
            id: '关雎',
            title: '关雎',
            author: '《诗经·周南》',
            dynasty: '先秦',
            questions: [
                {
                    id: 'guanju_1',
                    type: 'contextual',
                    question: '乐器在古代生活中发挥着重要作用，《诗经·关雎》中写到乐器的句子是"_______"和"_______"。',
                    answer: '窈窕淑女，琴瑟友之，窈窕淑女，钟鼓乐之',
                    year: '2022',
                    exam: '新高考I卷'
                }
            ]
        },
        '氓': {
            id: '氓',
            title: '氓',
            author: '《诗经·卫风》',
            dynasty: '先秦',
            questions: [
                {
                    id: 'mang_1',
                    type: 'contextual',
                    question: '《诗经·氓》中男女主人公有过愉快的往昔，"_______，_______"就是对他们小时候欢乐相处的描写。',
                    answer: '总角之宴，言笑晏晏',
                    year: '2022',
                    exam: '全国甲卷'
                },
                {
                    id: 'mang_2',
                    type: 'understanding',
                    question: '《诗经·氓》中写婚前女子温柔相对为"氓"，并体现出男子的粗暴性格的句子是"_______"。',
                    answer: '氓之蚩蚩，抱布贸丝',
                    category: '模拟试题'
                }
            ]
        },
        '左传·庄公十年': {
            id: '左传·庄公十年',
            title: '左传·庄公十年',
            author: '左丘明',
            dynasty: '春秋',
            questions: [
                {
                    id: 'zuochuan_1',
                    type: 'contextual',
                    question: '《左传·庄公十年》记载，长勺之战结束后，曹刿向鲁庄公解释说，确认齐军不是佯装败退而进退决定追击，是因为"_______，_______"。',
                    answer: '吾视其辙乱，望其旗靡',
                    year: '2021',
                    exam: '全国甲卷'
                }
            ]
        },
        '论语·述而': {
            id: '论语·述而',
            title: '论语·述而',
            author: '孔子',
            dynasty: '春秋',
            questions: [
                {
                    id: 'lunyu_shuerzhe_1',
                    type: 'contextual',
                    question: '在《论语·述而》中孔子提出，即使吃粗饭，喝冷水，枕着胳膊睡觉，也可以乐在其中；而"_______，_______"。',
                    answer: '不义而富且贵，于我如浮云',
                    year: '2020',
                    exam: '新高考III卷'
                }
            ]
        },
        '水调歌头': {
            id: '水调歌头',
            title: '水调歌头·明月几时有',
            author: '苏轼',
            dynasty: '宋',
            questions: [
                {
                    id: 'shuidiao_1',
                    type: 'contextual',
                    question: '在《水调歌头·明月几时有》中，苏轼自言想要重返天上，但又有所顾虑，原因在_______，_______。',
                    answer: '又恐琼楼玉宇，高处不胜寒',
                    year: '2020',
                    exam: '全国甲卷'
                }
            ]
        },
        '伶官传序': {
            id: '伶官传序',
            title: '五代史伶官传序',
            author: '欧阳修',
            dynasty: '宋',
            questions: [
                {
                    id: 'lingguan_3',
                    type: 'contextual',
                    question: '欧阳修在《五代史伶官传序》中感慨，当李存勖强盛的时候，"_______，_______"，而等到他衰败的时候，几十个伶人围困他，就身死国灭，为天下人所笑。',
                    answer: '一夫夜呼，乱者四应',
                    year: '2021',
                    exam: '新高考II卷'
                }
            ]
        },
        '渔家傲': {
            id: '渔家傲',
            title: '渔家傲·秋思',
            author: '范仲淹',
            dynasty: '宋',
            questions: [
                {
                    id: 'yujia_1',
                    type: 'understanding',
                    question: '范仲淹《渔家傲·秋思》中"_______，_______"两句反用东汉大将窦宪追击匈奴刻石燕然功的典故，写尽了边塞老兵多而不得归的无奈之情。',
                    answer: '燕然未勒归无计，羌管悠悠霜满地',
                    category: '模拟试题'
                }
            ]
        },
        '雁门太守行': {
            id: '雁门太守行',
            title: '雁门太守行',
            author: '李贺',
            dynasty: '唐',
            questions: [
                {
                    id: 'yanmen_1',
                    type: 'understanding',
                    question: '《雁门太守行》中的"_______"一句写景兼事，渲染了敌军兵临城下的紧张气氛和危急形势，写出了守城将士的威武雄壮。',
                    answer: '黑云压城城欲摧',
                    category: '模拟试题'
                }
            ]
        },
        '爱莲说': {
            id: '爱莲说',
            title: '爱莲说',
            author: '周敦颐',
            dynasty: '宋',
            questions: [
                {
                    id: 'ailian_1',
                    type: 'understanding',
                    question: '《爱莲说》中表达作者"出淤泥而不染"的品格追求的句子是：_______，_______。',
                    answer: '莲，花之君子者也，出淤泥而不染',
                    category: '模拟试题'
                }
            ]
        },
        '琵琶行完整版': {
            id: '琵琶行完整版',
            title: '琵琶行(并序)完整版',
            author: '白居易',
            dynasty: '唐',
            questions: [
                {
                    id: 'pipa_complete_1',
                    type: 'contextual',
                    question: '白居易《琵琶行》中"_______"两句，写琵琶女以歌舞女身份娱乐的技艺演奏了当时有名的两首乐曲。',
                    answer: '轻拢慢捻抹复挑，初为霓裳后六幺',
                    year: '2022',
                    exam: '全国乙卷'
                }
            ]
        },
        '送杜少府之任蜀州': {
            id: '送杜少府之任蜀州',
            title: '送杜少府之任蜀州',
            author: '王勃',
            dynasty: '唐',
            questions: [
                {
                    id: 'songdu_1',
                    type: 'understanding',
                    question: '王勃《送杜少府之任蜀州》中"_______，_______"两句化用了地理名词"三秦"。',
                    answer: '城阙辅三秦，风烟望五津',
                    category: '开放性默写'
                }
            ]
        }
    },

    // 不定向默写（答案不唯一的题目）
    flexible: [
        {
            id: 'flex_1',
            title: '诸葛亮画像题诗',
            question: '小刚临摹了一幅诸葛亮的画像，想在上面题两句诗，却一直没想好。汪老师认为不妨直接用古人成句，比如"_______，_______"就很好。',
            answer: '出师未捷身先死，长使英雄泪满襟',
            alternatives: ['出师一表真名世，千载谁堪伯仲间'],
            source: '杜甫《蜀相》等',
            year: '2023',
            exam: '新高考全国Ⅱ卷'
        },
        {
            id: 'flex_2',
            title: '学习与思考的关系',
            question: '在"停课不停学"期间的云班会上讨论"学习和思考的关系"，你想强调学习的重要性，可以引用荀子《劝学》中的"_______，_______"。',
            answer: '吾尝终日而思矣，不如须臾之所学也',
            alternatives: ['锲而不舍，金石可镂'],
            source: '荀子《劝学》',
            year: '2020',
            exam: '天津卷'
        },
        {
            id: 'flex_3',
            title: '鸟类啭鸣引发愁绪',
            question: '自然界鸟类的啭鸣令时令分别发人们的忠思愁绪，这在唐宋诗词中屡见不鲜，如"_______，_______"。',
            answer: '感时花溅泪，恨别鸟惊心',
            alternatives: ['春眠不觉晓，处处闻啼鸟', '月出惊山鸟，时鸣春涧中', '鸟宿池边树，僧敲月下门'],
            source: '杜甫《春望》等',
            year: '2022',
            exam: '新高考I卷'
        },
        {
            id: 'flex_4',
            title: '三秦地理名词',
            question: '项羽破秦入关，三分关中之地，以秦降将章邯为雍王、司马欣为塞王、董翳为翟王，合称"三秦"。从此"三秦"作为一个地理名词，频繁在古诗词中出现，如"_______，_______"。',
            answer: '城阙辅三秦，风烟望五津',
            alternatives: ['秦中花鸟已应阑，塞外风沙犹自寒'],
            source: '王勃《送杜少府之任蜀州》等',
            year: '2021',
            exam: '新高考I卷'
        }
    ]
};

// 工具函数
const comprehensiveUtils = {
    // 获取所有文章列表
    getAllArticles: function() {
        return Object.values(comprehensiveDatabase.articles);
    },
    
    // 根据文章ID获取文章
    getArticleById: function(id) {
        return comprehensiveDatabase.articles[id];
    },
    
    // 获取文章的所有题目
    getQuestionsByArticle: function(articleId) {
        const article = this.getArticleById(articleId);
        return article ? article.questions : [];
    },
    
    // 获取多篇文章的题目
    getQuestionsByArticles: function(articleIds) {
        let questions = [];
        articleIds.forEach(id => {
            const articleQuestions = this.getQuestionsByArticle(id);
            questions = questions.concat(articleQuestions);
        });
        return questions;
    },
    
    // 获取不定向默写题目
    getFlexibleQuestions: function() {
        return comprehensiveDatabase.flexible;
    },
    
    // 随机打乱题目
    shuffleQuestions: function(questions) {
        const shuffled = [...questions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    // 获取指定数量的随机题目
    getRandomQuestions: function(questions, count) {
        const shuffled = this.shuffleQuestions(questions);
        return shuffled.slice(0, Math.min(count, shuffled.length));
    },
    
    // 根据类型筛选题目
    filterQuestionsByType: function(questions, type) {
        return questions.filter(q => q.type === type);
    },
    
    // 根据年份筛选题目
    filterQuestionsByYear: function(questions, year) {
        return questions.filter(q => q.year === year);
    },
    
    // 根据考试类型筛选题目
    filterQuestionsByExam: function(questions, exam) {
        return questions.filter(q => q.exam && q.exam.includes(exam));
    },
    
    // 获取所有高考真题
    getAllExamQuestions: function() {
        let examQuestions = [];
        Object.values(comprehensiveDatabase.articles).forEach(article => {
            const questions = article.questions.filter(q => q.year && q.exam);
            examQuestions = examQuestions.concat(questions);
        });
        return examQuestions;
    },
    
    // 按朝代分类题目
    getQuestionsByDynasty: function(dynasty) {
        let questions = [];
        Object.values(comprehensiveDatabase.articles).forEach(article => {
            if (article.dynasty === dynasty) {
                questions = questions.concat(article.questions);
            }
        });
        return questions;
    },
    
    // 统计信息
    getStatistics: function() {
        const articles = Object.values(comprehensiveDatabase.articles);
        const totalQuestions = articles.reduce((sum, article) => sum + article.questions.length, 0);
        const examQuestions = this.getAllExamQuestions().length;
        const dynasties = [...new Set(articles.map(article => article.dynasty))];
        
        return {
            totalArticles: articles.length,
            totalQuestions: totalQuestions + comprehensiveDatabase.flexible.length,
            examQuestions: examQuestions,
            dynasties: dynasties,
            flexibleQuestions: comprehensiveDatabase.flexible.length
        };
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        comprehensiveDatabase,
        comprehensiveUtils
    };
}

// 示例使用
console.log('题库统计信息：', comprehensiveUtils.getStatistics());
console.log('所有高考真题数量：', comprehensiveUtils.getAllExamQuestions().length);
console.log('唐朝文章题目：', comprehensiveUtils.getQuestionsByDynasty('唐').length + '道');