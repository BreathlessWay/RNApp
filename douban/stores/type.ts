import { BookStateType } from 'douban/stores/state/book/type';
import { MovieStateType } from 'douban/stores/state/movie/type';
import { MusicStateType } from 'douban/stores/state/music/type';
import { AppStateType } from 'douban/stores/state/app/type';

export type StateType = {
	book: BookStateType;
	music: MusicStateType;
	movie: MovieStateType;
	app: AppStateType;
};
