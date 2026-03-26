from sanskrit_rag.config import settings


def test_settings_repo_root_points_to_repo():
    assert settings.repo_root.name == "Sanskrit_RagSystem"


def test_default_paths_stay_inside_repo():
    assert settings.data_dir.is_absolute()
    assert settings.index_path.is_absolute()
    assert settings.chunks_path.is_absolute()
