```
.
├── README.md
├── app.json
├── babel.config.js
├── cnode/
│   ├── App.tsx
│   ├── components/
│   │   ├── DrawerComponent/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── TopicItem/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   └── package.json
│   ├── config/
│   │   ├── constant.ts
│   │   └── package.json
│   ├── package.json
│   ├── pages/
│   │   ├── ScanPage/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── TopicsPage/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── index.tsx
│   │   └── package.json
│   ├── routes/
│   │   ├── drawer.tsx
│   │   ├── index.tsx
│   │   ├── package.json
│   │   ├── tab.tsx
│   │   └── type.ts
│   ├── services/
│   │   └── package.json
│   ├── stores/
│   │   ├── app/
│   │   │   ├── action.ts
│   │   │   ├── epic.ts
│   │   │   ├── reducer.ts
│   │   │   └── type.ts
│   │   ├── package.json
│   │   ├── rootActions.ts
│   │   ├── rootEpics.ts
│   │   ├── rootReducers.ts
│   │   ├── rootStore.ts
│   │   ├── rootType.ts
│   │   ├── topics/
│   │   │   ├── action.ts
│   │   │   ├── epic.ts
│   │   │   ├── reducer.ts
│   │   │   └── type.ts
│   │   └── user/
│   │       ├── action.ts
│   │       ├── epic.ts
│   │       ├── reducer.ts
│   │       └── type.ts
│   ├── styles/
│   │   ├── common.ts
│   │   └── package.json
│   └── utils/
│       ├── package.json
│       └── request.ts
├── commitlint.config.js
├── douban/
│   ├── App.tsx
│   ├── components/
│   │   ├── BookItemComponent/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── CommonFlatList/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── MovieItemComponent/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── MusicItemComponent/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── SearchComponent/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   └── package.json
│   ├── config/
│   │   ├── constant.ts
│   │   └── package.json
│   ├── package.json
│   ├── pages/
│   │   ├── BookDetailPage/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── BookPage/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── MoviePage/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── MusicPage/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── WebViewPage/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   └── package.json
│   ├── routes/
│   │   ├── package.json
│   │   ├── router.tsx
│   │   ├── tab.tsx
│   │   └── type.ts
│   ├── services/
│   │   ├── getList.ts
│   │   └── package.json
│   ├── stores/
│   │   ├── index.ts
│   │   ├── package.json
│   │   ├── reducer/
│   │   │   ├── index.ts
│   │   │   └── type.ts
│   │   ├── state/
│   │   │   ├── app/
│   │   │   │   ├── state.ts
│   │   │   │   └── type.ts
│   │   │   ├── book/
│   │   │   │   ├── state.ts
│   │   │   │   └── type.ts
│   │   │   ├── movie/
│   │   │   │   ├── state.ts
│   │   │   │   └── type.ts
│   │   │   └── music/
│   │   │       ├── state.ts
│   │   │       └── type.ts
│   │   └── type.ts*
│   ├── styles/
│   │   ├── common.ts
│   │   └── package.json
│   └── utils/
│       ├── dataStore.ts
│       ├── package.json
│       └── request.ts
├── global.d.ts
├── index.js
├── metro.config.js
├── package-lock.json
├── package.json
├── tree.md
├── trending/
│   ├── App.tsx
│   ├── components/
│   │   ├── business/
│   │   │   ├── CommonFlatList/
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.ts
│   │   │   ├── KrListItem/
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.ts
│   │   │   ├── NavHeader/
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.ts
│   │   │   ├── ReposListItem/
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.ts
│   │   │   ├── TrendListItem/
│   │   │   │   └── index.tsx
│   │   │   ├── TrendingListItem/
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.ts
│   │   │   └── UserListItem/
│   │   │       ├── index.tsx
│   │   │       └── style.ts
│   │   ├── common/
│   │   │   ├── AnimateSliderComponent/
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.ts
│   │   │   ├── CommonParallaxScrollView/
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.ts
│   │   │   ├── CommonSafeTopComponent/
│   │   │   │   └── index.tsx
│   │   │   ├── EmptyComponent/
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.ts
│   │   │   ├── ListFooterComponent/
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.ts
│   │   │   ├── MenuListItem/
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.ts
│   │   │   └── PopupComponent/
│   │   │       ├── index.tsx
│   │   │       └── style.ts
│   │   └── package.json
│   ├── config/
│   │   ├── about.json
│   │   ├── constant.ts
│   │   ├── hydrate.ts
│   │   ├── menu.ts
│   │   └── package.json
│   ├── package.json
│   ├── pages/
│   │   ├── about/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── author/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── detail/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── edit/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── favorite/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── me/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── package.json
│   │   ├── popular/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── remove/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── search/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── sort/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── theme/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── trend/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── webview/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   └── welcome/
│   │       ├── index.tsx
│   │       └── style.ts
│   ├── routes/
│   │   ├── favoriteTab.tsx
│   │   ├── index.tsx
│   │   ├── package.json
│   │   ├── popularTab.tsx
│   │   ├── route.d.ts
│   │   ├── style.ts
│   │   ├── switch.tsx
│   │   └── trendTab.tsx
│   ├── stores/
│   │   ├── app/
│   │   │   └── index.ts
│   │   ├── favorite/
│   │   │   ├── favorite.d.ts
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   ├── package.json
│   │   ├── popular/
│   │   │   ├── index.ts
│   │   │   └── popular.d.ts
│   │   ├── search/
│   │   │   └── index.ts
│   │   └── trend/
│   │       ├── index.ts
│   │       └── trend.d.ts
│   ├── styles/
│   │   ├── common.ts
│   │   └── package.json
│   ├── types/
│   │   ├── repos.d.ts
│   │   └── tab.d.ts
│   └── utils/
│       ├── dataStore.ts
│       ├── package.json
│       └── request.ts
└── tsconfig.json

85 directories, 192 files
```
