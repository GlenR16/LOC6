# Generated by Django 5.0.3 on 2024-03-09 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_game_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='gamesession',
            name='is_active',
            field=models.BooleanField(default=True, verbose_name='Is Active'),
        ),
    ]
