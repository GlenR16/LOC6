# Generated by Django 5.0.3 on 2024-03-09 08:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_game_user_interests_gamesession_sessiondatapoint'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='games',
            field=models.ManyToManyField(blank=True, related_name='users', to='api.game'),
        ),
    ]