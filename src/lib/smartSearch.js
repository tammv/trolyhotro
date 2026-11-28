/**
 * Smart Vietnamese Natural-Language Search for StudyZen
 * Supports diacritic-insensitive matching, conversational phrasing,
 * student synonyms, and relevance-ranked results across all 32 scenarios.
 */

const STOPWORDS = new Set([
  'em', 'minh', 'toi', 'con', 'ban', 'cau', 'to', 'nha', 'nhe', 'a', 'oi',
  'la', 'thi', 'ma', 'va', 'voi', 'cua', 'cho', 'khi', 'luc', 'nhu', 'the',
  'nao', 'sao', 'gi', 'bi', 'duoc', 'bi', 'cu', 'hay', 'qua', 'lam', 'rat',
  'hoi', 'nen', 'vi', 'do', 'tai', 'tu', 'den', 've', 'trong', 'ngoai', 'tren',
  'duoi', 'nay', 'kia', 'do', 'day', 'ay', 'nhung', 'cac', 'mot', 'hai', 'ba',
  'da', 'dang', 'se', 'van', 'con', 'lai', 'nua', 'roi', 'xong', 'het', 'ca',
  'de', 'ma', 'neu', 'tuy', 'nhien', 'nhung', 'ma', 'thay', 'cam', 'thay',
  'muon', 'can', 'phai', 'dang', 'gap', 'phai', 'tinh', 'huong', 'van', 'de'
]);

/**
 * Normalize Vietnamese text: lowercase, strip diacritics, convert đ -> d,
 * and collapse non-alphanumeric characters to single spaces.
 */
export function normalizeVi(text = '') {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9.\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Tokenize normalized text into meaningful words.
 * Falls back to raw tokens if all words are stopwords.
 */
function extractMeaningfulTokens(normalized) {
  if (!normalized) return [];
  const raw = normalized.split(' ').filter(Boolean);
  const meaningful = raw.filter(t => !STOPWORDS.has(t) && t.length >= 2);
  return meaningful.length > 0 ? meaningful : raw;
}

/**
 * Conversational keywords, synonyms, and natural student phrasings per scenario code.
 */
export const SCENARIO_SYNONYMS = {
  '1.1': 'nhieu bai tap qua tai don bai cung luc nhieu mon khong lam xue ngop bai tap deadline chong chat',
  '1.2': 'khong hieu de bai yeu cau la gi doc de khong hieu khong biet co giao yeu cau gi mo ho de bai',
  '1.3': 'khong biet han nop khi nao nop bai quen lich nop tre han thoi han nop bai',
  '1.4': 'nop bai o dau cach nop bai online gui bai qua dau khong biet cach nop',
  '1.5': 'thoi gian qua ngan gap qua khong du thoi gian lam bai gap rut',
  '1.6': 'khong biet bat dau tu dau nhin de khong biet viet gi mo bai bi ket trang giay',
  '1.7': 'mac ket cho kho bai kho khong giai duoc dung hinh bi y giua chung khong biet lam tiep',
  '1.8': 'khong kip gio tre deadline khong lam kip bai sap het gio nop bai',
  '1.9': 'loi nop bai khong tai len duoc khong gui duoc bai mang lag loi he thong azota google classroom',
  '1.10': 'nhieu bai kiem tra lien tiep thi don lich thi sat nhau on khong kip',
  '1.11': 'khong biet on gi gioi han de cuong noi dung on tap kiem tra',
  '1.12': 'chua biet cach on thi lap ke hoach on tap chuan bi kiem tra',
  '1.13': 'on roi ma van run chua tu tin lo lang chua san sang di thi',
  '1.14': 'khong du gio lam bai kiem tra chia thoi gian lam de khong kip cau cuoi',
  '1.15': 'gap cau kho trong phong thi bi cau kho bo qua hay lam tiep mat binh tinh khi thi',
  '1.16': 'khong hieu sao diem thap bai lam chua dat yeu cau mat diem o dau',
  '1.17': 'co giao nhan xet khong biet sua sao sua bai cho nao rut kinh nghiem',
  '1.18': 'doi lich thi doi han nop thay doi lich bat ngo doi gio kiem tra',
  '1.19': 'so tra bai so diem thap lo lang ket qua thi hoi hop cho diem',
  '1.20': 'thi xong van am anh nghi mai cau lam sai hoi tiec sau khi thi',
  '1.21': 'thi nhieu mon trong mot ngay lich thi trung ngay met moi',
  '1.22': 'muon tam su co nguoi lang nghe buon chuyen hoc ap luc muon chia se khong co ai hieu',
  '1.23': 'tren lop khong hieu bai ngai hoi thay co giang nhanh qua mat goc tren lop',
  '1.24': 'bo me danh ba me mang so ve nha bi chui diem thap bi danh ap luc gia dinh bao luc',
  '1.25': 'mat ngu thuc khuya bo bua an uong that thuong kiet suc anh huong suc khoe sinh hoat',
  '1.26': 'chan hoc mat hung thu khong con dong luc hoc cho co lam xong cho xong',
  '1.27': 'run khi thuyet trinh so noi truoc lop ngai len bang tim dap chan run noi lap',
  '1.28': 'khong co tien hoc them hoc phi dat kho khan tai chinh nha ngheo tu hoc khong di hoc them',
  '1.29': 'thu nhieu lan van that bai nan chi muon bo cuoc co gang hoai khong duoc',
  '1.30': 'gian doan ke hoach hoc tap bo ngang muon bo muc tieu dut quang mat nhip om nghi hoc quay lai',
  '1.31': 'tri hoan luoi hoc doi buoi hoc de mai tinh khong giu duoc lich on deu dan ngai mo sach',
  '1.32': 'on lai van sai so cau dung khong tang hoc hoai khong tien bo diem khong len van nham loi cu',
  '1.33': 'so sanh diem so voi ban so ba me that vong gia dinh ap luc con nha nguoi ta diem thap bi trach',
  '1.34': 'on roi van chua yen tam lo quen bai khi thi dong vo khong nho cau hoi khac mau tu kiem tra truoc thi',
  '1.35': 'diem kiem tra thap mat tu tin ngai phat bieu so noi sai bi ban treu choc im lang trong gio hoc',
  '1.36': 'no luc ao hoc lau khong nho gap vo quen luon doc thay quen lam lai khong duoc hay xao nhang mat tap trung',
  '1.37': 'hoc bu nghi hoc mat bai theo kip bai moi muon vo ban chep bai bu bi hong kien thuc buoi truoc',
  '1.38': 'hoc them lich hoc day dac sap xep thoi gian giua hoc o truong va hoc them ve muon thieu gio ngu bai don',
  '1.39': 'van dung kien thuc da hoc vao bai tap moi hieu de nho cach cu nhung khong biet dung o buoc nao',
  '1.40': 'bai nhom sap den han ban khong rep tin nhan khong chia viec om het bai ghep bai tre han nop bai nhom',
};

/**
 * Build searchable index fields once per problem object.
 */
export function buildSearchMeta(prob) {
  const code = String(prob.Code || '');
  const titleNorm = normalizeVi(prob.Title || '');
  const tagNorm = normalizeVi(prob.tag || '');
  const synonymsNorm = normalizeVi(SCENARIO_SYNONYMS[code] || '');

  const branchText = (prob.Branches || [])
    .map(b => `${b.BranchTitle || b.OptionText || ''}`)
    .join(' ');
  const optionsText = (prob.Options || [])
    .map(o => `${o.Text || o || ''}`)
    .join(' ');

  const bodyNorm = normalizeVi(
    `${prob.Intro || ''} ${prob.RootQuestion || ''} ${optionsText} ${branchText}`
  );

  const combinedWords = new Set(
    `${titleNorm} ${tagNorm} ${synonymsNorm} ${bodyNorm}`.split(' ').filter(Boolean)
  );

  return {
    titleNorm,
    tagNorm,
    synonymsNorm,
    bodyNorm,
    combinedWords,
  };
}

/**
 * Score how well a problem matches a natural Vietnamese query.
 * Returns 0 if not relevant.
 */
export function scoreProblemMatch(prob, queryNorm, queryTokens) {
  const meta = prob._searchMeta || buildSearchMeta(prob);
  const { titleNorm, tagNorm, synonymsNorm, bodyNorm, combinedWords } = meta;

  let score = 0;

  // 1. Exact full-phrase matches
  if (titleNorm.includes(queryNorm)) score += 35;
  if (synonymsNorm.includes(queryNorm)) score += 28;
  if (tagNorm.includes(queryNorm)) score += 22;
  if (bodyNorm.includes(queryNorm)) score += 14;

  // 2. Bigram phrase matches for natural multi-word expressions
  if (queryTokens.length >= 2) {
    for (let i = 0; i < queryTokens.length - 1; i++) {
      const bigram = `${queryTokens[i]} ${queryTokens[i + 1]}`;
      if (titleNorm.includes(bigram)) score += 14;
      if (synonymsNorm.includes(bigram)) score += 12;
      if (bodyNorm.includes(bigram)) score += 6;
    }
  }

  // 3. Individual meaningful token matching
  let matchedTokens = 0;
  for (const token of queryTokens) {
    let tokenMatched = false;

    if (titleNorm.includes(token)) {
      score += 7;
      tokenMatched = true;
    }
    if (synonymsNorm.includes(token)) {
      score += 6;
      tokenMatched = true;
    }
    if (tagNorm.includes(token)) {
      score += 5;
      tokenMatched = true;
    }
    if (!tokenMatched && bodyNorm.includes(token)) {
      score += 3;
      tokenMatched = true;
    }
    // Prefix tolerance for longer words (e.g. partial typing)
    if (!tokenMatched && token.length >= 4) {
      for (const word of combinedWords) {
        if (word.startsWith(token)) {
          score += 2;
          tokenMatched = true;
          break;
        }
      }
    }

    if (tokenMatched) matchedTokens++;
  }

  if (matchedTokens === 0) return 0;

  // Require reasonable coverage for longer natural sentences
  const coverage = matchedTokens / queryTokens.length;
  if (queryTokens.length >= 3 && matchedTokens === 1 && score < 14) {
    return 0;
  }

  score += Math.round(coverage * 10);
  return score;
}

/**
 * Filter & rank problems by category and natural-language search query.
 */
export function filterAndRankProblems(problems, searchQuery, activeCategory) {
  const categoryFiltered = problems.filter(
    p => activeCategory === 'all' || p.category === activeCategory
  );

  const queryNorm = normalizeVi(searchQuery);
  if (!queryNorm) return categoryFiltered;

  const queryTokens = extractMeaningfulTokens(queryNorm);
  if (queryTokens.length === 0) return categoryFiltered;

  return categoryFiltered
    .map(prob => ({
      prob,
      score: scoreProblemMatch(prob, queryNorm, queryTokens),
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.prob);
}
