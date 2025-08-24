// 全局变量
let currentChapter = '';
let currentPoemIndex = 0;
let poems = [];
let currentExerciseType = 'auto'; // 'auto', 'fillFront', 'fillBack'
let currentExerciseIndex = 0;
let currentExerciseConfig = null; // 当前练习配置
let isShowingOriginal = false; // 是否在题目区显示原文
let currentFontScale = 1; // 题目区字号缩放（1为基准）

// 多选模式相关变量
let selectedPoems = []; // 选中的古诗文
let selectionMode = 'single'; // 'single' 或 'multi'
let exerciseMode = 'complete'; // 'complete' 或 'random'

// 分页相关变量
let currentPage = 0;
let questionsPerPage = 10; // 每页显示的题目数量
let allQuestions = []; // 所有题目

// 古诗文数据库 - 优先使用外部文件中的数据
// 内置备用数据库（避免与外部同名冲突）
const builtinPoemDatabase = {
    // 如需内置少量示例数据，可添加到这里
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('古诗文默写系统已加载完成！');
    const activeDatabase = (typeof poemDatabase !== 'undefined') ? poemDatabase : builtinPoemDatabase;
    console.log('数据库包含章节：', Object.keys(activeDatabase));
    
    // 尝试从外部文件加载数据
    loadExternalData();
    
    // 添加选择模式切换事件监听器
    setupSelectionModeListeners();
});

// 设置选择模式监听器
function setupSelectionModeListeners() {
    // 选择模式切换
    document.querySelectorAll('input[name="selectionMode"]').forEach(radio => {
        radio.addEventListener('change', function() {
            selectionMode = this.value;
            selectedPoems = []; // 清空选择
            displayPoemList();
        });
    });
    
    // 练习模式切换
    document.querySelectorAll('input[name="exerciseMode"]').forEach(radio => {
        radio.addEventListener('change', function() {
            exerciseMode = this.value;
            const randomSettings = document.getElementById('randomSettings');
            if (this.value === 'random') {
                randomSettings.style.display = 'block';
            } else {
                randomSettings.style.display = 'none';
            }
        });
    });
}

// 加载外部数据文件
function loadExternalData() {
    // 如果外部数据文件已加载，使用外部数据
    if (typeof poemDatabase !== 'undefined') {
        console.log('使用外部数据文件');
        return;
    }
    
    // 否则使用内置数据
    console.log('使用内置数据');
}

// 选择章节
function selectChapter(chapter) {
    console.log('选择章节：', chapter);
    currentChapter = chapter;
    
    // 优先使用外部数据
    const db = (typeof poemDatabase !== 'undefined') ? poemDatabase : builtinPoemDatabase;
    poems = db[chapter] || [];
    
    document.getElementById('chapterSelection').style.display = 'none';
    document.getElementById('poemSelection').style.display = 'block';
    document.getElementById('currentChapter').textContent = chapter;
    displayPoemList();
}

// 显示诗文列表
function displayPoemList() {
    const poemList = document.getElementById('poemList');
    poemList.innerHTML = '';
    
    poems.forEach((poem, index) => {
        const poemItem = document.createElement('div');
        poemItem.className = 'poem-item';
        poemItem.dataset.index = index;
        
        // 根据选择模式设置点击事件
        if (selectionMode === 'single') {
            poemItem.onclick = () => selectPoem(index);
        } else {
            poemItem.onclick = () => togglePoemSelection(index);
        }
        
        // 简化显示，只显示标题
        poemItem.innerHTML = `
            <div class="poem-checkbox" style="display: ${selectionMode === 'multi' ? 'block' : 'none'}">
                <input type="checkbox" id="poem_${index}" ${selectedPoems.includes(index) ? 'checked' : ''}>
            </div>
            <h4>${poem.title}</h4>
            <p class="author">${poem.author}</p>
        `;
        
        poemList.appendChild(poemItem);
    });
    
    // 更新操作按钮显示
    updateActionButtons();
}

// 选择诗文（单选模式）
function selectPoem(index) {
    currentPoemIndex = index;
    const poem = poems[index];
    
    document.getElementById('poemSelection').style.display = 'none';
    document.getElementById('recitationPage').style.display = 'block';
    document.getElementById('poemTitle').textContent = poem.title;
    
    displayPoem(poem);
}

// 切换诗文选择（多选模式）
function togglePoemSelection(index) {
    const checkbox = document.getElementById(`poem_${index}`);
    if (selectedPoems.includes(index)) {
        selectedPoems = selectedPoems.filter(i => i !== index);
        checkbox.checked = false;
    } else {
        selectedPoems.push(index);
        checkbox.checked = true;
    }
    updateActionButtons();
}

// 更新操作按钮显示
function updateActionButtons() {
    const actionButtons = document.getElementById('actionButtons');
    const exerciseMode = document.getElementById('exerciseMode');
    
    if (selectionMode === 'multi') {
        actionButtons.style.display = 'block';
        exerciseMode.style.display = 'block';
        
        // 根据选中的诗文数量更新按钮状态
        const startBtn = document.querySelector('.start-exercise-btn');
        if (selectedPoems.length > 0) {
            startBtn.disabled = false;
            startBtn.textContent = `开始练习 (${selectedPoems.length}篇)`;
        } else {
            startBtn.disabled = true;
            startBtn.textContent = '开始练习';
        }
    } else {
        actionButtons.style.display = 'none';
        exerciseMode.style.display = 'none';
    }
}

// 清除选择
function clearSelection() {
    selectedPoems = [];
    displayPoemList();
}

// 开始多选练习
function startMultiExercise() {
    if (selectedPoems.length === 0) {
        alert('请至少选择一篇古诗文！');
        return;
    }
    
    const exerciseMode = document.querySelector('input[name="exerciseMode"]:checked').value;
    
    if (exerciseMode === 'complete') {
        // 完整题目模式
        startCompleteExercise();
    } else {
        // 随机生成模式
        startRandomExercise();
    }
}

// 开始完整题目练习
function startCompleteExercise() {
    // 收集所有选中古诗文的句子
    const allSentences = [];
    selectedPoems.forEach(poemIndex => {
        const poem = poems[poemIndex];
        if (poem.sentences) {
            poem.sentences.forEach(sentence => {
                allSentences.push({
                    ...sentence,
                    poemTitle: poem.title,
                    poemAuthor: poem.author
                });
            });
        }
    });
    
    // 创建练习配置
    currentExerciseConfig = {
        type: 'multiComplete',
        title: `多篇完整练习 (${selectedPoems.length}篇)`,
        description: '所有选中古诗文的完整练习',
        items: allSentences,
        currentIndex: 0
    };
    
    // 进入练习页面
    document.getElementById('poemSelection').style.display = 'none';
    document.getElementById('recitationPage').style.display = 'block';
    document.getElementById('poemTitle').textContent = currentExerciseConfig.title;
    
    displayMultiExercise();
}

// 开始随机练习
function startRandomExercise() {
    const totalQuestions = parseInt(document.getElementById('totalQuestions').value) || 10;
    
    // 收集所有选中古诗文的句子
    const allSentences = [];
    selectedPoems.forEach(poemIndex => {
        const poem = poems[poemIndex];
        if (poem.sentences) {
            poem.sentences.forEach(sentence => {
                allSentences.push({
                    ...sentence,
                    poemTitle: poem.title,
                    poemAuthor: poem.author
                });
            });
        }
    });
    
    // 随机选择句子，确保每篇古诗文被选中的概率相等
    const selectedSentences = selectRandomSentences(allSentences, totalQuestions);
    
    // 创建练习配置
    currentExerciseConfig = {
        type: 'multiRandom',
        title: `随机练习 (${totalQuestions}题)`,
        description: `从${selectedPoems.length}篇古诗文中随机抽取${totalQuestions}题`,
        items: selectedSentences,
        currentIndex: 0
    };
    
    // 进入练习页面
    document.getElementById('poemSelection').style.display = 'none';
    document.getElementById('recitationPage').style.display = 'block';
    document.getElementById('poemTitle').textContent = currentExerciseConfig.title;
    
    displayMultiExercise();
}

// 随机选择句子，确保公平性
function selectRandomSentences(allSentences, count) {
    // 按古诗文分组
    const poemGroups = {};
    allSentences.forEach(sentence => {
        const key = `${sentence.poemTitle}_${sentence.poemAuthor}`;
        if (!poemGroups[key]) {
            poemGroups[key] = [];
        }
        poemGroups[key].push(sentence);
    });
    
    const poemKeys = Object.keys(poemGroups);
    const selectedSentences = [];
    
    // 确保每篇古诗文至少被选中一次（如果可能）
    const minPerPoem = Math.floor(count / poemKeys.length);
    const remaining = count % poemKeys.length;
    
    poemKeys.forEach((key, index) => {
        const sentences = poemGroups[key];
        const selectCount = minPerPoem + (index < remaining ? 1 : 0);
        
        // 从这篇古诗文中随机选择指定数量的句子
        const shuffled = shuffleArray([...sentences]);
        selectedSentences.push(...shuffled.slice(0, selectCount));
    });
    
    // 最后再次打乱顺序
    return shuffleArray(selectedSentences);
}

// 数组随机打乱函数
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// 显示多选练习
function displayMultiExercise() {
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';
    
    if (!currentExerciseConfig || currentExerciseConfig.items.length === 0) {
        questionsContainer.innerHTML = '<p>没有可用的练习题目</p>';
        return;
    }
    
    // 保存所有题目
    allQuestions = currentExerciseConfig.items;
    
    // 计算分页
    const totalPages = Math.ceil(allQuestions.length / questionsPerPage);
    currentPage = 0;
    
    // 显示分页控制（如果有多页）
    const paginationControls = document.getElementById('paginationControls');
    if (totalPages > 1) {
        paginationControls.style.display = 'flex';
        updatePageInfo(totalPages);
    } else {
        paginationControls.style.display = 'none';
    }
    
    // 在标题右边添加"显示所有答案"按钮
    const poemTitle = document.getElementById('poemTitle');
    if (poemTitle && !poemTitle.querySelector('.show-all-answers-btn')) {
        const titleContainer = document.createElement('div');
        titleContainer.className = 'title-container';
        titleContainer.style.display = 'flex';
        titleContainer.style.alignItems = 'center';
        titleContainer.style.justifyContent = 'space-between';
        titleContainer.style.gap = '15px';
        
        const titleText = poemTitle.textContent;
        poemTitle.textContent = '';
        
        const titleSpan = document.createElement('span');
        titleSpan.textContent = titleText;
        titleContainer.appendChild(titleSpan);
        
        const showAllBtn = document.createElement('button');
        showAllBtn.className = 'show-all-answers-btn';
        showAllBtn.onclick = toggleAllAnswers;
        showAllBtn.textContent = '显示所有答案';
        titleContainer.appendChild(showAllBtn);
        
        // 添加字体大小调整控件
        const fontSizeControls = document.createElement('div');
        fontSizeControls.className = 'font-size-controls';
        fontSizeControls.innerHTML = `
            <label>题目字体：</label>
            <input type="range" id="questionFontSize" min="12" max="24" value="16" onchange="adjustFontSize('question', this.value)">
            <span id="questionFontSizeValue">16px</span>
            <label>答案字体：</label>
            <input type="range" id="answerFontSize" min="12" max="24" value="16" onchange="adjustFontSize('answer', this.value)">
            <span id="answerFontSizeValue">16px</span>
        `;
        titleContainer.appendChild(fontSizeControls);
        
        const hideAllBtn = document.createElement('button');
        hideAllBtn.className = 'hide-all-answers-btn';
        hideAllBtn.onclick = hideAllAnswers;
        hideAllBtn.textContent = '一键隐藏答案';
        hideAllBtn.style.display = 'none';
        titleContainer.appendChild(hideAllBtn);
        
        poemTitle.appendChild(titleContainer);
    }
    
    // 显示当前页的题目
    displayCurrentPage();
}

// 显示当前页的题目
function displayCurrentPage() {
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';
    
    const startIndex = currentPage * questionsPerPage;
    const endIndex = Math.min(startIndex + questionsPerPage, allQuestions.length);
    const currentQuestions = allQuestions.slice(startIndex, endIndex);
    

    
    currentQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        
        const questionNumber = startIndex + index + 1;
        
        questionDiv.innerHTML = `
            <div class="question-header">
                <span class="question-number">${questionNumber}</span>
                <button class="show-answer-btn" onclick="toggleAnswer(this, '${question.back || '（无后半句）'}')">显示答案</button>
                <span class="question-source">${question.poemTitle || '未知'} - ${question.poemAuthor || '未知'}</span>
            </div>
            <div class="question-content">
                <p class="question-text">${question.front}</p>
                <div class="answer-section">
                    <p class="answer-text" style="display: none;">答案：${question.back || '（无后半句）'}</p>
                </div>
            </div>
        `;
        
        questionsContainer.appendChild(questionDiv);
    });
}

// 更新页码信息
function updatePageInfo(totalPages) {
    const pageInfo = document.getElementById('pageInfo');
    pageInfo.textContent = `第 ${currentPage + 1} 页，共 ${totalPages} 页`;
}

// 上一页
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayCurrentPage();
        updatePageInfo(Math.ceil(allQuestions.length / questionsPerPage));
    }
}

// 下一页
function nextPage() {
    const totalPages = Math.ceil(allQuestions.length / questionsPerPage);
    if (currentPage < totalPages - 1) {
        currentPage++;
        displayCurrentPage();
        updatePageInfo(totalPages);
    }
}

// 显示诗文内容
function displayPoem(poem) {
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';
    
    // 创建练习选择器
    createExerciseSelector(poem);
}

// 创建练习选择器
function createExerciseSelector(poem) {
    const questionsContainer = document.getElementById('questionsContainer');
    
    // 清除之前的选择器
    const existingSelector = document.querySelector('.exercise-selector');
    if (existingSelector) existingSelector.remove();
    
    questionsContainer.innerHTML = '';
    
    if (!poem.exercises || poem.exercises.length === 0) {
        // 如果没有自定义练习，使用默认模式
        createDefaultExercise(poem);
        return;
    }
    
    // 创建练习选择器
    const exerciseSelector = document.createElement('div');
    exerciseSelector.className = 'exercise-selector';
    
    let selectorHTML = '<h4>选择练习方式：</h4><div class="exercise-options">';
    
    poem.exercises.forEach((exercise, index) => {
        selectorHTML += `
            <div class="exercise-option" onclick="selectExercise(${index})">
                <h5>${exercise.title}</h5>
                <p>${exercise.description}</p>
                <span class="exercise-type-badge">${getExerciseTypeName(exercise.type)}</span>
            </div>
        `;
    });
    
    selectorHTML += '</div>';
    
    // 附加"整篇练习"快捷选项（不依赖自定义题，自动按整篇生成）
    selectorHTML += `
        <div class="exercise-type-selector" style="margin-top:16px;">
            <h4>整篇练习</h4>
            <div class="exercise-buttons">
                <button class="exercise-btn" onclick="startFullText('fillBack')">整篇填后句</button>
                <button class="exercise-btn" onclick="startFullText('fillFront')">整篇填前句</button>
            </div>
        </div>
    `;
    exerciseSelector.innerHTML = selectorHTML;
    
    questionsContainer.appendChild(exerciseSelector);
}

// 选择练习
function selectExercise(exerciseIndex) {
    const poem = poems[currentPoemIndex];
    currentExerciseConfig = poem.exercises[exerciseIndex];
    
    // 清除选择器
    const selector = document.querySelector('.exercise-selector');
    if (selector) selector.remove();
    
    // 生成练习内容
    generateCustomExercise();
}

// 启动整篇自动生成的前/后句练习
function startFullText(type) {
    currentExerciseType = type === 'fillFront' ? 'fillFront' : 'fillBack';
    const selector = document.querySelector('.exercise-selector');
    if (selector) selector.remove();
    generateExercise();
}

// 生成自定义练习
function generateCustomExercise() {
    const questionsContainer = document.getElementById('questionsContainer');
    let exercise = currentExerciseConfig;
    
    console.log('生成自定义练习：', exercise);
    
    // 清除之前的练习内容
    questionsContainer.innerHTML = '';
    
    // 若配置声明整篇自动生成（独立但完整），先构造完整 items
    if (exercise && exercise.autoFull === true && (exercise.type === 'fillFront' || exercise.type === 'fillBack')) {
        const poem = poems[currentPoemIndex];
        const pairs = splitIntoFrontBackPairs(poem.content);
        const items = pairs.map(p => ({ front: p.front, back: p.back }));
        exercise = { ...exercise, items };
    }

    // 准备题目数据
    let questions = [];
    
    if (exercise.type === 'auto') {
        // 自动模式：使用预定义的空白位置
        const words = poems[currentPoemIndex].content.split('');
        const blanks = exercise.blanks || [];
        
        blanks.forEach((index, i) => {
            questions.push({
                number: i + 1,
                front: words.slice(0, index).join(''),
                back: words[index],
                source: `${poems[currentPoemIndex].title} - ${poems[currentPoemIndex].author}`,
                poemTitle: poems[currentPoemIndex].title,
                poemAuthor: poems[currentPoemIndex].author
            });
        });
        
    } else if (exercise.type === 'fillFront' || exercise.type === 'fillBack') {
        // 填前句/填后句模式：使用预定义的练习项目
        const items = exercise.items || [];
        
        items.forEach((item, index) => {
            if (exercise.type === 'fillFront') {
                questions.push({
                    number: index + 1,
                    front: item.back,
                    back: item.front,
                    source: `${poems[currentPoemIndex].title} - ${poems[currentPoemIndex].author}`,
                    poemTitle: poems[currentPoemIndex].title,
                    poemAuthor: poems[currentPoemIndex].author
                });
            } else {
                questions.push({
                    number: index + 1,
                    front: item.front,
                    back: item.back,
                    source: `${poems[currentPoemIndex].title} - ${poems[currentPoemIndex].author}`,
                    poemTitle: poems[currentPoemIndex].title,
                    poemAuthor: poems[currentPoemIndex].author
                });
            }
        });
    }
    
    // 保存所有题目
    allQuestions = questions;
    
    // 计算分页
    const totalPages = Math.ceil(allQuestions.length / questionsPerPage);
    currentPage = 0;
    
    // 显示分页控制（如果有多页）
    const paginationControls = document.getElementById('paginationControls');
    if (totalPages > 1) {
        paginationControls.style.display = 'flex';
        updatePageInfo(totalPages);
    } else {
        paginationControls.style.display = 'none';
    }
    
    // 在标题右边添加"显示所有答案"按钮
    const poemTitle = document.getElementById('poemTitle');
    if (poemTitle && !poemTitle.querySelector('.show-all-answers-btn')) {
        const titleContainer = document.createElement('div');
        titleContainer.className = 'title-container';
        titleContainer.style.display = 'flex';
        titleContainer.style.alignItems = 'center';
        titleContainer.style.justifyContent = 'space-between';
        titleContainer.style.gap = '15px';
        
        const titleText = poemTitle.textContent;
        poemTitle.textContent = '';
        
        const titleSpan = document.createElement('span');
        titleSpan.textContent = titleText;
        titleContainer.appendChild(titleSpan);
        
        const showAllBtn = document.createElement('button');
        showAllBtn.className = 'show-all-answers-btn';
        showAllBtn.onclick = toggleAllAnswers;
        showAllBtn.textContent = '显示所有答案';
        titleContainer.appendChild(showAllBtn);
        
        poemTitle.appendChild(titleContainer);
    }
    
    // 显示当前页的题目
    displayCurrentPage();
}

// 创建默认练习（兼容旧版本）
function createDefaultExercise(poem) {
    const questionsContainer = document.getElementById('questionsContainer');
    
    // 添加练习类型选择
    const exerciseTypeSelector = document.createElement('div');
    exerciseTypeSelector.className = 'exercise-type-selector';
    exerciseTypeSelector.innerHTML = `
        <h4>选择练习类型：</h4>
        <div class="exercise-buttons">
            <button class="exercise-btn" onclick="setExerciseType('auto')">自动模式</button>
            <button class="exercise-btn" onclick="setExerciseType('fillFront')">填前句</button>
            <button class="exercise-btn" onclick="setExerciseType('fillBack')">填后句</button>
        </div>
    `;
    
    questionsContainer.appendChild(exerciseTypeSelector);
    
    // 默认显示自动模式
    setExerciseType('auto');
}

// 获取练习类型名称
function getExerciseTypeName(type) {
    const typeNames = {
        'auto': '自动模式',
        'fillFront': '填前句',
        'fillBack': '填后句'
    };
    return typeNames[type] || type;
}

// 设置练习类型（兼容旧版本）
function setExerciseType(type) {
    currentExerciseType = type;
    
    // 更新按钮样式
    document.querySelectorAll('.exercise-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 找到对应的按钮并添加active类
    const targetBtn = document.querySelector(`[onclick="setExerciseType('${type}')"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    
    // 生成对应的练习内容
    generateExercise();
}

// 生成练习内容（兼容旧版本）
function generateExercise() {
    const poem = poems[currentPoemIndex];
    const questionsContainer = document.getElementById('questionsContainer');
    
    console.log('生成练习，诗文：', poem.title);
    console.log('练习类型：', currentExerciseType);
    console.log('诗文内容：', poem.content);
    
    // 获取选择器
    const selector = document.querySelector('.exercise-type-selector');
    
    // 清除之前的练习内容
    questionsContainer.innerHTML = '';
    
    // 准备题目数据
    let questions = [];
    
    if (currentExerciseType === 'auto') {
        // 自动模式：随机选择一些字词作为空白
        const words = poem.content.split('');
        const blankIndices = poem.blanks || [];
        
        blankIndices.forEach((index, i) => {
            questions.push({
                number: i + 1,
                front: words.slice(0, index).join(''),
                back: words[index],
                source: `${poem.title} - ${poem.author}`,
                poemTitle: poem.title,
                poemAuthor: poem.author
            });
        });
        
    } else if (currentExerciseType === 'fillFront') {
        // 填前句模式：整句按前后半句成对生成
        const pairs = splitIntoFrontBackPairs(poem.content);
        console.log('填前句模式，分割后的前后句对：', pairs);
        
        pairs.forEach((pair, index) => {
            questions.push({
                number: index + 1,
                front: pair.back,
                back: pair.front,
                source: `${poem.title} - ${poem.author}`,
                poemTitle: poem.title,
                poemAuthor: poem.author
            });
        });
        
    } else if (currentExerciseType === 'fillBack') {
        // 填后句模式：整句按前后半句成对生成
        const pairs = splitIntoFrontBackPairs(poem.content);
        console.log('填后句模式，分割后的前后句对：', pairs);
        
        pairs.forEach((pair, index) => {
            questions.push({
                number: index + 1,
                front: pair.front,
                back: pair.back,
                source: `${poem.title} - ${poem.author}`,
                poemTitle: poem.title,
                poemAuthor: poem.author
            });
        });
    }
    
    console.log('生成的题目：', questions);
    
    // 保存所有题目
    allQuestions = questions;
    
    // 计算分页
    const totalPages = Math.ceil(allQuestions.length / questionsPerPage);
    currentPage = 0;
    
    // 显示分页控制（如果有多页）
    const paginationControls = document.getElementById('paginationControls');
    if (totalPages > 1) {
        paginationControls.style.display = 'flex';
        updatePageInfo(totalPages);
    } else {
        paginationControls.style.display = 'none';
    }
    
    // 在标题右边添加"显示所有答案"按钮
    const poemTitle = document.getElementById('poemTitle');
    if (poemTitle && !poemTitle.querySelector('.show-all-answers-btn')) {
        const titleContainer = document.createElement('div');
        titleContainer.className = 'title-container';
        titleContainer.style.display = 'flex';
        titleContainer.style.alignItems = 'center';
        titleContainer.style.justifyContent = 'space-between';
        titleContainer.style.gap = '15px';
        
        const titleText = poemTitle.textContent;
        poemTitle.textContent = '';
        
        const titleSpan = document.createElement('span');
        titleSpan.textContent = titleText;
        titleContainer.appendChild(titleSpan);
        
        const showAllBtn = document.createElement('button');
        showAllBtn.className = 'show-all-answers-btn';
        showAllBtn.onclick = toggleAllAnswers;
        showAllBtn.textContent = '显示所有答案';
        titleContainer.appendChild(showAllBtn);
        
        // 添加字体大小调整控件
        const fontSizeControls = document.createElement('div');
        fontSizeControls.className = 'font-size-controls';
        fontSizeControls.innerHTML = `
            <label>题目字体：</label>
            <input type="range" id="questionFontSize" min="12" max="24" value="16" onchange="adjustFontSize('question', this.value)">
            <span id="questionFontSizeValue">16px</span>
            <label>答案字体：</label>
            <input type="range" id="answerFontSize" min="12" max="24" value="16" onchange="adjustFontSize('answer', this.value)">
            <span id="answerFontSizeValue">16px</span>
        `;
        titleContainer.appendChild(fontSizeControls);
        
        const hideAllBtn = document.createElement('button');
        hideAllBtn.className = 'hide-all-answers-btn';
        hideAllBtn.onclick = hideAllAnswers;
        hideAllBtn.textContent = '一键隐藏答案';
        hideAllBtn.style.display = 'none';
        titleContainer.appendChild(hideAllBtn);
        
        poemTitle.appendChild(titleContainer);
    }
    
    // 显示当前页的题目
    displayCurrentPage();
}

// 智能分割句子，优先在标点符号处分割
function splitByPunctuation(text) {
    console.log('开始分割文本：', text);
    
    // 如果文本没有句号，直接按逗号分割
    if (!text.includes('。')) {
        console.log('文本没有句号，直接按逗号分割');
        const parts = text.split(/[，、]/).filter(part => part.trim());
        console.log('按逗号分割结果：', parts);
        return parts;
    }
    
    // 按句号分割，但保留标点符号
    const sentences = text.split('。').filter(s => s.trim());
    console.log('按句号分割结果：', sentences);
    
    // 进一步处理每个句子，在逗号、顿号等标点处分割
    const result = [];
    sentences.forEach((sentence, index) => {
        if (!sentence.trim()) return;
        
        if (sentence.includes('，') || sentence.includes('、')) {
            // 如果句子包含逗号或顿号，按这些标点分割
            const parts = sentence.split(/[，、]/);
            parts.forEach(part => {
                if (part.trim()) {
                    result.push(part.trim());
                }
            });
        } else {
            result.push(sentence.trim());
        }
    });
    
    console.log('最终分割结果：', result);
    return result;
}

// 寻找自然的分割点
function findNaturalSplitPoint(sentence) {
    // 优先在逗号、顿号处分割
    const commaIndex = sentence.indexOf('，');
    const pauseIndex = sentence.indexOf('、');
    
    if (commaIndex !== -1) {
        return commaIndex + 1; // 包含逗号
    } else if (pauseIndex !== -1) {
        return pauseIndex + 1; // 包含顿号
    } else {
        // 如果没有标点，则在句子中间分割
        return Math.floor(sentence.length / 2);
    }
}

// 将整篇文本拆成前后句对
function splitIntoFrontBackPairs(text) {
    // 先按句号拆句；若结尾无句号，最后一段也保留
    const sentences = text.split('。').map(s => s.trim()).filter(Boolean);
    
    const pairs = [];
    
    sentences.forEach(sentence => {
        if (!sentence) return;
        
        // 寻找自然的分割点
        const splitPoint = findNaturalSplitPoint(sentence);
        
        const front = sentence.substring(0, splitPoint);
        const back = sentence.substring(splitPoint);
        
        if (front && back) {
            pairs.push({ front, back });
        } else if (front) {
            // 如果只有前半部分，将其作为完整句子
            pairs.push({ front: '', back: front });
        }
    });
    
    console.log('前后句对：', pairs);
    return pairs;
}

// 返回章节选择
function backToChapter() {
    currentChapter = '';
    currentPoemIndex = 0;
    poems = [];
    
    document.getElementById('poemSelection').style.display = 'none';
    document.getElementById('recitationPage').style.display = 'none';
    document.getElementById('chapterSelection').style.display = 'block';
}

// 切换答案显示/隐藏
function toggleAnswer(button, answer) {
    const questionItem = button.closest('.question-item');
    const answerText = questionItem.querySelector('.answer-text');
    if (answerText.style.display === 'none') {
        answerText.style.display = 'block';
        button.textContent = '隐藏答案';
        button.classList.add('active');
    } else {
        answerText.style.display = 'none';
        button.textContent = '显示答案';
        button.classList.remove('active');
    }
}

// 显示所有答案
function toggleAllAnswers() {
    const answerTexts = document.querySelectorAll('.answer-text');
    const showAllBtn = document.querySelector('.show-all-answers-btn');
    const hideAllBtn = document.querySelector('.hide-all-answers-btn');
    
    answerTexts.forEach(answerText => {
        answerText.style.display = 'block';
    });
    
    // 更新所有按钮状态
    document.querySelectorAll('.show-answer-btn').forEach(btn => {
        btn.textContent = '隐藏答案';
        btn.classList.add('active');
    });
    
    showAllBtn.style.display = 'none';
    hideAllBtn.style.display = 'inline-block';
}

// 隐藏所有答案
function hideAllAnswers() {
    const answerTexts = document.querySelectorAll('.answer-text');
    const showAllBtn = document.querySelector('.show-all-answers-btn');
    const hideAllBtn = document.querySelector('.hide-all-answers-btn');
    
    answerTexts.forEach(answerText => {
        answerText.style.display = 'none';
    });
    
    // 更新所有按钮状态
    document.querySelectorAll('.show-answer-btn').forEach(btn => {
        btn.textContent = '显示答案';
        btn.classList.remove('active');
    });
    
    showAllBtn.style.display = 'inline-block';
    hideAllBtn.style.display = 'none';
}

// 切换原文显示/隐藏
function toggleOriginalText(button, source) {
    const questionDiv = button.closest('.question-item');
    const originalTextSection = questionDiv.querySelector('.original-text-section');
    
    if (originalTextSection.style.display === 'none') {
        originalTextSection.style.display = 'block';
        button.textContent = '隐藏原文';
        button.classList.add('active');
    } else {
        originalTextSection.style.display = 'none';
        button.textContent = '显示原文';
        button.classList.remove('active');
    }
}

// 调整字体大小
function adjustFontSize(type, size) {
    const sizeValue = size + 'px';
    
    if (type === 'question') {
        document.querySelectorAll('.question-text').forEach(text => {
            text.style.fontSize = sizeValue;
        });
        document.getElementById('questionFontSizeValue').textContent = sizeValue;
    } else if (type === 'answer') {
        document.querySelectorAll('.answer-text, .original-text').forEach(text => {
            text.style.fontSize = sizeValue;
        });
        document.getElementById('answerFontSizeValue').textContent = sizeValue;
    }
}

// 返回诗文选择
function backToPoem() {
    currentPoemIndex = 0;
    
    document.getElementById('recitationPage').style.display = 'none';
    document.getElementById('poemSelection').style.display = 'block';
}
