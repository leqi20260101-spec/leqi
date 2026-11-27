// 상품 데이터 — 실제 상품으로 교체해서 사용하세요.
// shape: 상품 이미지 대신 표시되는 일러스트 형태 (tee, knit, coat, pants, skirt, dress, cap, bag)
// 실제 사진을 쓰려면 image: 'assets/img/파일명.jpg' 를 추가하면 됩니다.

const CATEGORIES = [
  { key: 'top', label: '상의' },
  { key: 'bottom', label: '하의' },
  { key: 'outer', label: '아우터' },
  { key: 'dress', label: '원피스' },
  { key: 'acc', label: 'ACC' },
];

const PRODUCTS = [
  {
    id: 'p001', name: '오버핏 코튼 티셔츠', category: 'top', shape: 'tee',
    price: 29000, colors: [
      { name: '화이트', hex: '#f4f4f2' }, { name: '블랙', hex: '#222222' }, { name: '멜란지그레이', hex: '#b9b9b9' },
    ],
    sizes: ['S', 'M', 'L', 'XL'], isNew: true, isBest: true,
    desc: '탄탄한 20수 코튼으로 제작한 데일리 오버핏 티셔츠입니다. 세탁 후에도 형태 변형이 적습니다.',
    material: '면 100%', fit: '오버핏',
  },
  {
    id: 'p002', name: '울 블렌드 라운드 니트', category: 'top', shape: 'knit',
    price: 59000, salePrice: 49000, colors: [
      { name: '아이보리', hex: '#ece4d4' }, { name: '차콜', hex: '#444444' }, { name: '버건디', hex: '#6d2433' },
    ],
    sizes: ['S', 'M', 'L'], isNew: true, isBest: true,
    desc: '부드러운 울 혼방 원사로 따뜻하면서도 가볍게 입을 수 있는 라운드 니트입니다.',
    material: '울 30%, 아크릴 50%, 나일론 20%', fit: '레귤러핏',
  },
  {
    id: 'p003', name: '스트라이프 옥스포드 셔츠', category: 'top', shape: 'knit',
    price: 45000, colors: [
      { name: '블루', hex: '#9db6d6' }, { name: '화이트', hex: '#f4f4f2' },
    ],
    sizes: ['S', 'M', 'L', 'XL'], isNew: false, isBest: true,
    desc: '단독으로도, 니트 안에 레이어드해도 좋은 베이직 옥스포드 셔츠입니다.',
    material: '면 100%', fit: '세미오버핏',
  },
  {
    id: 'p004', name: '와이드 데님 팬츠', category: 'bottom', shape: 'pants',
    price: 55000, colors: [
      { name: '연청', hex: '#8fa9c7' }, { name: '진청', hex: '#2f4462' },
    ],
    sizes: ['S', 'M', 'L', 'XL'], isNew: true, isBest: true,
    desc: '허리부터 밑단까지 자연스럽게 떨어지는 와이드 실루엣의 데님 팬츠입니다.',
    material: '면 98%, 스판 2%', fit: '와이드핏',
  },
  {
    id: 'p005', name: '코튼 치노 팬츠', category: 'bottom', shape: 'pants',
    price: 42000, colors: [
      { name: '베이지', hex: '#cbb894' }, { name: '블랙', hex: '#222222' },
    ],
    sizes: ['S', 'M', 'L', 'XL'], isNew: false, isBest: false,
    desc: '어떤 상의와도 잘 어울리는 스트레이트 치노 팬츠입니다.',
    material: '면 100%', fit: '스트레이트핏',
  },
  {
    id: 'p006', name: '플리츠 미디 스커트', category: 'bottom', shape: 'skirt',
    price: 48000, salePrice: 38400, colors: [
      { name: '블랙', hex: '#222222' }, { name: '카키', hex: '#6b6b4e' },
    ],
    sizes: ['S', 'M', 'L'], isNew: false, isBest: true,
    desc: '움직일 때마다 자연스럽게 흔들리는 플리츠 디테일의 미디 기장 스커트입니다.',
    material: '폴리에스터 100%', fit: '허리 밴딩',
  },
  {
    id: 'p007', name: '울 싱글 코트', category: 'outer', shape: 'coat',
    price: 189000, salePrice: 159000, colors: [
      { name: '카멜', hex: '#b08654' }, { name: '블랙', hex: '#222222' },
    ],
    sizes: ['S', 'M', 'L'], isNew: true, isBest: true,
    desc: '깔끔한 싱글 버튼 디자인의 울 코트입니다. 겨울 내내 손이 가는 기본 아우터.',
    material: '울 60%, 폴리에스터 40%', fit: '레귤러핏',
  },
  {
    id: 'p008', name: '숏 패딩 점퍼', category: 'outer', shape: 'coat',
    price: 129000, colors: [
      { name: '블랙', hex: '#222222' }, { name: '아이보리', hex: '#ece4d4' },
    ],
    sizes: ['S', 'M', 'L', 'XL'], isNew: true, isBest: false,
    desc: '가볍지만 보온성이 뛰어난 덕다운 충전재의 숏 패딩입니다.',
    material: '겉감 나일론 100% / 충전재 덕다운 80%, 깃털 20%', fit: '세미오버핏',
  },
  {
    id: 'p009', name: '니트 롱 원피스', category: 'dress', shape: 'dress',
    price: 79000, colors: [
      { name: '오트밀', hex: '#d9cbb3' }, { name: '브라운', hex: '#6b4b36' },
    ],
    sizes: ['S', 'M'], isNew: true, isBest: false,
    desc: '몸에 부드럽게 감기는 니트 소재의 롱 원피스입니다.',
    material: '아크릴 70%, 울 20%, 나일론 10%', fit: '슬림핏',
  },
  {
    id: 'p010', name: '플라워 셔링 원피스', category: 'dress', shape: 'dress',
    price: 69000, colors: [
      { name: '네이비', hex: '#2b3550' }, { name: '크림', hex: '#efe6d2' },
    ],
    sizes: ['S', 'M', 'L'], isNew: false, isBest: true,
    desc: '허리 셔링으로 체형 보완이 되는 플라워 패턴 원피스입니다.',
    material: '레이온 100%', fit: '루즈핏',
  },
  {
    id: 'p011', name: '워싱 코튼 볼캡', category: 'acc', shape: 'cap',
    price: 25000, colors: [
      { name: '블랙', hex: '#222222' }, { name: '베이지', hex: '#cbb894' },
    ],
    sizes: ['FREE'], isNew: false, isBest: true,
    desc: '자연스러운 워싱 가공으로 빈티지한 느낌을 살린 볼캡입니다.',
    material: '면 100%', fit: '사이즈 조절 가능',
  },
  {
    id: 'p012', name: '캔버스 토트백', category: 'acc', shape: 'bag',
    price: 35000, colors: [
      { name: '내추럴', hex: '#e8dcc4' }, { name: '블랙', hex: '#222222' },
    ],
    sizes: ['FREE'], isNew: true, isBest: false,
    desc: '노트북도 들어가는 넉넉한 사이즈의 두꺼운 캔버스 토트백입니다.',
    material: '면 캔버스 100%', fit: '가로 40 × 세로 38 × 폭 12cm',
  },
];
