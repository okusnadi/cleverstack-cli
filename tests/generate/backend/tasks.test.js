var chai      = require('chai')
  , expect    = chai.expect
  , exec      = require('child_process').exec
  , path      = require('path')
  , rimraf    = require('rimraf')
  , fs        = require('fs')
  , binPath   = path.join(__dirname, '..', '..', '..', 'bin')
  , assetPath = path.join(__dirname, '..', '..', 'assets');

chai.config.includeStack = true;

describe('Generate backend seed (tasks)', function () {
  before(function (done) {
    rimraf(path.join(assetPath, 'my-new-project', 'backend', 'modules', 'Testing2'), function () { done(); });
  });

  after(function (done) {
    rimraf(path.join(assetPath, 'my-new-project', 'backend', 'modules', 'Testing2'), function () { done(); });
  });

  it('should be able to create', function (done) {
    exec(path.join(binPath, 'clever-generate') + ' task Testing2', { cwd: path.join(assetPath, 'my-new-project', 'backend', 'modules') }, function (err, stdout, stderr) {
      expect(stderr).to.equal('');
      expect(stdout).to.not.match(/already exists within/);

      expect(fs.readdirSync(path.join(assetPath, 'my-new-project', 'backend', 'modules', 'Testing2')).length).to.equal(1);
      expect(fs.existsSync(path.join(assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'tasks', 'Testing2Task.js'))).to.be.true;

      var service = fs.readFileSync(path.join(assetPath, 'my-new-project', 'backend', 'modules', 'Testing2', 'tasks', 'Testing2Task.js'));
      expect(service).to.match(/module\.exports =.*classe?s?.*\.extend\(/);

      done(err);
    });
  });

  it('should have trouble creating an existing task', function (done) {
    exec(path.join(binPath, 'clever-generate') + ' task Testing2', { cwd: path.join(assetPath, 'my-new-project', 'backend', 'modules') }, function (err, stdout, stderr) {
      expect(stderr).to.equal('');
      expect(stdout).to.match(/Testing2Task\.js already exists within/);
      done(err);
    });
  });
});
