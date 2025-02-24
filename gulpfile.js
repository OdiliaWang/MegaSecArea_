const gulp = require('gulp');
const fileInclude = require('gulp-file-include');

gulp.task('html', function () {
  return gulp.src(['src/*.html']) // 來源 HTML 檔案
    .pipe(fileInclude({
      prefix: '@@', // 指定 include 語法的前綴符號
      basepath: '@file' // 讓路徑基於當前 HTML 檔案
    }))
    .pipe(gulp.dest('dist')); // 生成處理後的 HTML 到 dist 資料夾
});

// 監聽 HTML 變更
gulp.task('watch', function () {
  gulp.watch('src/**/*.html', gulp.series('html'));
});

// 預設執行任務
gulp.task('default', gulp.series('html', 'watch'));