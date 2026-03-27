from code.config import settings


def test_settings_repo_root_points_to_repo():
    assert settings.repo_root.name
    assert settings.repo_root.is_dir()


def test_default_paths_stay_inside_repo():
    assert settings.data_dir.is_absolute()
    assert settings.index_path.is_absolute()
    assert settings.chunks_path.is_absolute()
