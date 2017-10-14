import{
  CHANGE_IS_MOBILE,
  CHANGE_WIDTH_AND_HEIGHT,
  INIT_ENVIRONMENT,
} from './ActionTypes';

export function changeIsMobile(isMobile = false){
  return {
    type: CHANGE_IS_MOBILE,
    isMobile,
  };
}
export function changeWidthAndHeight(screenWidth, screenHeight) {
  return {
    type: CHANGE_WIDTH_AND_HEIGHT,
    screenWidth,
    screenHeight
  };
}
export function initEnvironment(){
  return {
    type: INIT_ENVIRONMENT,
  };
}